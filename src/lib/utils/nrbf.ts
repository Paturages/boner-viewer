import { decode } from "utf8-codec";

// Implemented from https://stackoverflow.com/a/30176566 and
// https://winprotocoldoc.blob.core.windows.net/productionwindowsarchives/MS-NRBF/%5bMS-NRBF%5d.pdf
// yea baby we decoding some binary files wooooooooooooooooooo
// (please end me)

// TODO: Refactor everything lmfao
const clone = (obj) => JSON.parse(JSON.stringify(obj));
const getPrimitiveTypeEnum = (byte) =>
  [
    ,
    "Boolean",
    "Byte",
    "Char",
    "???",
    "Decimal",
    "Double",
    "Int16",
    "Int32",
    "Int64",
    "SByte",
    "Single",
    "TimeSpan",
    "DateTime",
    "UInt16",
    "UInt32",
    "UInt64",
    "Null",
    "String",
  ][byte];
const getBinaryTypeEnum = (byte) =>
  [
    "Primitive",
    "String",
    "Object",
    "SystemClass",
    "Class",
    "ObjectArray",
    "StringArray",
    "PrimitiveArray",
  ][byte];

export const readNrbf = (
  buffer: Uint8Array
):
  | {
      failed: true;
      offset: number;
      _debug: any;
    }
  | {
      failed: false;
      name: string;
      data: any;
      _debug: any;
    } => {
  let offset = 0;
  const metadata: any = {};
  const objs: any = {};
  // 0. Some utility functions/shorthands to read data from a buffer
  const readBytesAsNumber = (nbBytes) => {
    let result = 0;
    const slice = buffer.slice(offset, offset + nbBytes);
    // It's big endian here
    for (let i = 0; i < nbBytes; ++i) {
      result += slice[i] * 256 ** i;
    }
    offset += nbBytes;
    return result;
  };
  const readByte = () => readBytesAsNumber(1);
  const readShort = () => readBytesAsNumber(2);
  const readInteger = () => readBytesAsNumber(4);
  const readString = () => {
    let strLength = buffer[offset];
    let i;
    // The way reading string lengths greater than 128 is the following:
    // The length information will span more than just one byte (i.e. [232, 3])
    // The length is big endian, but the first bit (i.e. the first '1' in (232).toString(2) == '11101000')
    // marks whether the length information is continued in the next byte or not (hence the >128 check).
    // When we go to the next byte, we strip the marker bit (^128 (-128 works too)) and we shift the new value
    // at the top (as a bigger value).
    for (i = 0; buffer[offset + i] >= 128; ++i) {
      strLength ^= 128;
      strLength += buffer[offset + i + 1] << (7 * (i + 1));
    }
    const start = offset + i + 1;
    const result = decode(buffer.slice(start, start + strLength));
    offset += strLength + i + 1;
    return result;
  };
  const readFloat32 = () => {
    const floatBuffer = new ArrayBuffer(4);
    const floatView = new DataView(floatBuffer);
    for (let i = 0; i < 4; ++i) {
      floatView.setUint8(3 - i, buffer[offset + i]);
    }
    offset += 4;
    return floatView.getFloat32(0);
  };

  // SerializedStreamHeader <00>
  const readSerializedStreamHeader = () => {
    metadata.serialization = {};
    metadata.serialization.rootId = readInteger();
    metadata.serialization.headerId = readInteger();
    metadata.serialization.majorVersion = readInteger();
    metadata.serialization.minorVersion = readInteger();
  };
  // BinaryLibrary <0C>
  const readBinaryLibrary = () => {
    metadata.binary = {};
    metadata.binary.libraryId = readInteger();
    metadata.binary.libraryName = readString();
  };
  // ClassWithMembersAndTypes <05>
  const readClassWithMembersAndTypes = (isSystem) => {
    // ClassInfo
    const classObj: any = {};
    classObj.objectId = readInteger();
    classObj.objectName = readString();
    classObj.memberCount = readInteger();
    classObj.members = [];
    for (let i = 0; i < classObj.memberCount; ++i) {
      classObj.members.push({ name: readString() });
    }
    // MemberTypeInfo (main types)
    for (let i = 0; i < classObj.memberCount; ++i) {
      classObj.members[i].type = getBinaryTypeEnum(readByte());
    }
    // MemberTypeInfo (specific names/types...)
    classObj.members.forEach((member) => {
      switch (member.type) {
        case "SystemClass":
          member.typeName = readString();
          break;
        case "Class":
          member.typeName = readString();
          member.libraryId = readInteger();
          break;
        case "String":
        case "StringArray": // do nothing
          break;
        case "Primitive":
        case "PrimitiveArray":
          member.typeName = getPrimitiveTypeEnum(readByte());
          break;
        default:
          throw new Error(member.type + " not handled");
      }
    });
    if (!isSystem) {
      classObj.libraryId = readInteger();
    }
    // MemberTypeInfo (references, values, etc...)
    classObj.members.forEach((member) => {
      if (
        ["SystemClass", "Class", "StringArray", "PrimitiveArray"].indexOf(
          member.type
        ) > -1
      ) {
        const recordTypeEnum = readByte();
        switch (recordTypeEnum) {
          // MemberReference
          case 0x09:
            member.refId = readInteger();
            break;
          default:
            throw new Error(
              member.type +
                " <" +
                recordTypeEnum.toString(16).padStart(2, "0") +
                "> not handled"
            );
        }
      } else if (member.type === "Primitive") {
        // Most likely a primitive
        switch (member.typeName) {
          case "Single":
            member.value = readFloat32();
            break;
          case "Int32":
            member.value = readInteger();
            break;
          default:
            console.log(member);
            throw new Error(member.typeName + " not handled");
        }
      } else if (member.type === "String") {
        const obj: any = {};
        offset++;
        obj.type = "BinaryObjectString";
        obj.objectId = readInteger();
        obj.value = readString();
        member.refId = obj.objectId;
        objs[obj.objectId] = obj;
      } else {
        throw new Error(member.type + " not handled");
      }
    });
    objs[classObj.objectId] = classObj;
  };
  const readClassWithId = () => {
    const classObj: any = {};
    classObj.objectId = readInteger();
    // The following metadataId integer refers to an already defined object:
    // Basically, the following values will follow the structure of the object
    // that is being referenced (I think, I hope)
    const metadataId = readInteger();
    const ref = objs[metadataId];
    classObj.objectName = ref.objectName;
    classObj.memberCount = ref.memberCount;
    classObj.members = clone(ref.members);
    // MemberTypeInfo (references, values, etc...)
    classObj.members.forEach((member) => {
      if (
        ["SystemClass", "StringArray", "PrimitiveArray"].indexOf(member.type) >
        -1
      ) {
        const recordTypeEnum = readByte();
        switch (recordTypeEnum) {
          // MemberReference
          case 0x09:
            member.refId = readInteger();
            break;
          default:
            throw new Error(
              member.type + " <" + recordTypeEnum + "> not handled"
            );
        }
      } else if (member.type === "Primitive") {
        // Most likely a primitive
        switch (member.typeName) {
          case "Single":
            member.value = readFloat32();
            break;
          case "Int32":
            member.value = readInteger();
            break;
          default:
            console.log(member);
            throw new Error(member.typeName + " not handled");
        }
      } else if (member.type === "String") {
        const obj: any = {};
        offset++;
        obj.type = "BinaryObjectString";
        obj.objectId = readInteger();
        obj.value = readString();
        member.refId = obj.objectId;
        objs[obj.objectId] = obj;
      } else {
        throw new Error(member.type + " not handled");
      }
    });
    objs[classObj.objectId] = classObj;
  };
  const readArraySingleString = () => {
    // ArrayInfo
    const objectId = readInteger();
    const length = readInteger();
    objs[objectId] = { objectId, length, values: [] };
    // Actual data
    for (let i = 0; i < length; ++i) {
      const recordTypeEnum = readByte();
      switch (recordTypeEnum) {
        // BinaryObjectString
        case 0x06:
          const obj: any = {};
          obj.type = "BinaryObjectString";
          obj.objectId = readInteger();
          obj.value = readString();
          objs[obj.objectId] = obj;
          objs[objectId].values.push({ refId: obj.objectId });
          break;
        // MemberReference
        case 0x09:
          objs[objectId].values.push({ refId: readInteger() });
          break;
        // ObjectNullMultiple256
        case 0x0d:
          const nullCount = readByte();
          i += nullCount - 1;
          for (let j = 0; j < nullCount; ++j)
            objs[objectId].values.push({ value: null });
          break;
        default:
          throw new Error(
            "ArraySingleString <" + recordTypeEnum + "> not handled"
          );
      }
    }
    if (buffer[offset] == 0x09) {
      offset++;
      objs[objectId].refId = readInteger();
    }
  };
  const readBinaryArray = () => {
    const obj: any = {};
    obj.objectId = readInteger();
    obj.binaryTypeEnum = readByte();
    obj.rank = readInteger();
    obj.lengths = [];
    for (let i = 0; i < obj.rank; ++i) {
      obj.lengths.push(readInteger());
    }
    obj.typeEnum = [
      "Primitive",
      "String",
      "Object",
      "SystemClass",
      "Class",
      "ObjectArray",
      "StringArray",
      "PrimitiveArray",
    ][readByte()];
    if (obj.typeEnum === "PrimitiveArray") {
      obj.arrayTypeEnum = getPrimitiveTypeEnum(readByte());
    } else if (obj.typeEnum === "Class") {
      obj.name = readString();
      obj.libraryId = readInteger();
    }
    obj.values = [];
    // MemberReference
    obj.lengths.forEach((length) => {
      for (let i = 0; i < length; ++i) {
        const recordTypeEnum = readByte();
        switch (recordTypeEnum) {
          // MemberReference
          case 0x09:
            obj.values.push({ refId: readInteger() });
            break;
          case 0x0a:
            obj.values.push({ value: null });
            break;
          // ObjectNullMultiple256
          case 0x0d:
            const nullCount = readByte();
            i += nullCount - 1;
            for (let j = 0; j < nullCount; ++j)
              obj.values.push({ value: null });
            break;
          default:
            console.log(obj);
            throw new Error("BinaryArray <" + recordTypeEnum + "> not handled");
        }
      }
    });
    objs[obj.objectId] = obj;
  };
  const readArraySinglePrimitive = () => {
    const obj: any = {};
    obj.objectId = readInteger();
    obj.length = readInteger();
    obj.primitiveTypeEnum = getPrimitiveTypeEnum(readByte());
    obj.values = [];
    for (let i = 0; i < obj.length; ++i) {
      switch (obj.primitiveTypeEnum) {
        case "Single":
          obj.values.push({ value: readFloat32() });
          break;
        case "Int32":
          obj.values.push({ value: readInteger() });
          break;
        default:
          throw new Error(obj.primitiveTypeEnum + " not handled");
      }
    }
    objs[obj.objectId] = obj;
  };

  const compileData = (): {
    failed: false;
    name: string;
    data: any;
    _debug: any;
  } => {
    const getValue = (value) => {
      if (value.value !== undefined) return value.value;
      if (value.values) {
        return value.values.map((v) => getValue(v));
      }
      if (value.members) {
        const obj = {};
        value.members.forEach((m) => saveMember(obj, m));
        return obj;
      }
      if (value.refId) {
        return getValue(objs[value.refId]);
      }
      return value;
    };

    const saveMember = (root, member) => {
      if (member.value !== undefined) return (root[member.name] = member.value);
      const obj = objs[member.refId];
      if (obj.value) {
        root[member.name] = obj.value;
      } else if (obj.values) {
        root[member.name] = obj.values.map(getValue);
      } else if (obj.members) {
        root[member.name] = {};
        obj.members.forEach((m) => saveMember(root[member.name], m));
      } else if (obj.refId) {
        saveMember(root, objs[obj.refId]);
      }
    };

    // The root will usually be objectId = 1 (the root class)
    const data = {};
    objs[1].members.forEach((member) => saveMember(data, member));
    return {
      failed: false,
      name: objs[1].objectName,
      data,
      _debug: { metadata, objs },
    };
  };

  while (offset < buffer.length) {
    const recordTypeEnum = readByte();
    try {
      switch (recordTypeEnum) {
        case 0x00:
          readSerializedStreamHeader();
          break;
        case 0x01:
          readClassWithId();
          break;
        case 0x04:
        case 0x05:
          readClassWithMembersAndTypes(recordTypeEnum === 0x04);
          break;
        case 0x07:
          readBinaryArray();
          break;
        case 0x0c:
          readBinaryLibrary();
          break;
        case 0x0f:
          readArraySinglePrimitive();
          break;
        case 0x11:
          readArraySingleString();
          break;
        // MessageEnd
        case 0x0b:
          return compileData();
        default:
          console.log(
            "Unrecognized",
            offset,
            "0x" + recordTypeEnum.toString(16),
            metadata,
            objs
          );
          return { failed: true, offset, _debug: { metadata, objs } };
      }
    } catch (err) {
      console.error(err);
      return { failed: true, offset, _debug: { metadata, objs } };
    }
  }

  return { failed: true, offset, _debug: { metadata, objs } };
};
