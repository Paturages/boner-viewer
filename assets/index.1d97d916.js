(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const o of l)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(l){const o={};return l.integrity&&(o.integrity=l.integrity),l.referrerpolicy&&(o.referrerPolicy=l.referrerpolicy),l.crossorigin==="use-credentials"?o.credentials="include":l.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(l){if(l.ep)return;l.ep=!0;const o=n(l);fetch(l.href,o)}})();function T(){}function At(t){return t()}function dt(){return Object.create(null)}function J(t){t.forEach(At)}function Nt(t){return typeof t=="function"}function X(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function Tt(t){return Object.keys(t).length===0}function u(t,e){t.appendChild(e)}function A(t,e,n){t.insertBefore(e,n||null)}function z(t){t.parentNode.removeChild(t)}function W(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function E(t){return document.createElement(t)}function L(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function $(t){return document.createTextNode(t)}function C(){return $(" ")}function Ie(){return $("")}function P(t,e,n,r){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n,r)}function a(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function Bt(t){return Array.from(t.childNodes)}function N(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function G(t,e,n,r){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,r?"important":"")}function mt(t,e,n){t.classList[n?"add":"remove"](e)}let ce;function fe(t){ce=t}function Ot(){if(!ce)throw new Error("Function called outside component initialization");return ce}function Lt(t){Ot().$$.on_mount.push(t)}const ae=[],Ue=[],Ee=[],ht=[],Pt=Promise.resolve();let Re=!1;function Ft(){Re||(Re=!0,Pt.then(Mt))}function Ge(t){Ee.push(t)}const Fe=new Set;let we=0;function Mt(){const t=ce;do{for(;we<ae.length;){const e=ae[we];we++,fe(e),Dt(e.$$)}for(fe(null),ae.length=0,we=0;Ue.length;)Ue.pop()();for(let e=0;e<Ee.length;e+=1){const n=Ee[e];Fe.has(n)||(Fe.add(n),n())}Ee.length=0}while(ae.length);for(;ht.length;)ht.pop()();Re=!1,Fe.clear(),fe(t)}function Dt(t){if(t.fragment!==null){t.update(),J(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(Ge)}}const $e=new Set;let D;function Ut(){D={r:0,c:[],p:D}}function Rt(){D.r||J(D.c),D=D.p}function F(t,e){t&&t.i&&($e.delete(t),t.i(e))}function U(t,e,n,r){if(t&&t.o){if($e.has(t))return;$e.add(t),D.c.push(()=>{$e.delete(t),r&&(n&&t.d(1),r())}),t.o(e)}else r&&r()}function ue(t){t&&t.c()}function H(t,e,n,r){const{fragment:l,after_update:o}=t.$$;l&&l.m(e,n),r||Ge(()=>{const s=t.$$.on_mount.map(At).filter(Nt);t.$$.on_destroy?t.$$.on_destroy.push(...s):J(s),t.$$.on_mount=[]}),o.forEach(Ge)}function V(t,e){const n=t.$$;n.fragment!==null&&(J(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Gt(t,e){t.$$.dirty[0]===-1&&(ae.push(t),Ft(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Y(t,e,n,r,l,o,s,i=[-1]){const d=ce;fe(t);const b=t.$$={fragment:null,ctx:[],props:o,update:T,not_equal:l,bound:dt(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(d?d.$$.context:[])),callbacks:dt(),dirty:i,skip_bound:!1,root:e.target||d.$$.root};s&&s(b.root);let g=!1;if(b.ctx=n?n(t,e.props||{},(c,k,...S)=>{const v=S.length?S[0]:k;return b.ctx&&l(b.ctx[c],b.ctx[c]=v)&&(!b.skip_bound&&b.bound[c]&&b.bound[c](v),g&&Gt(t,c)),k}):[],b.update(),g=!0,J(b.before_update),b.fragment=r?r(b.ctx):!1,e.target){if(e.hydrate){const c=Bt(e.target);b.fragment&&b.fragment.l(c),c.forEach(z)}else b.fragment&&b.fragment.c();e.intro&&F(t.$$.fragment),H(t,e.target,e.anchor,e.customElement),Mt()}fe(d)}class q{$destroy(){V(this,1),this.$destroy=T}$on(e,n){if(!Nt(n))return T;const r=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return r.push(n),()=>{const l=r.indexOf(n);l!==-1&&r.splice(l,1)}}$set(e){this.$$set&&!Tt(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const Ht=55296,Vt=56320;function He(t,e,n){let r="";e==null&&(e=0),n==null&&(n=t.length);for(let l=e;l<n;){const o=t[l++];let s;if(o<=128)s=o;else if(o>191&&o<224)s=(o&31)<<6|t[l++]&63;else if(o>239&&o<365){s=((o&7)<<18|(t[l++]&63)<<12|(t[l++]&63)<<6|t[l++]&63)-65536;const i=Ht|s>>10&1023;r+=String.fromCharCode(i),s=Vt|s&1023}else s=(o&15)<<12|(t[l++]&63)<<6|t[l++]&63;r+=String.fromCharCode(s)}return He.bytes=n-e,r}He.bytes=0;const Wt=t=>JSON.parse(JSON.stringify(t)),De=t=>[,"Boolean","Byte","Char","???","Decimal","Double","Int16","Int32","Int64","SByte","Single","TimeSpan","DateTime","UInt16","UInt32","UInt64","Null","String"][t],Kt=t=>["Primitive","String","Object","SystemClass","Class","ObjectArray","StringArray","PrimitiveArray"][t],Jt=t=>{let e=0;const n={},r={},l=f=>{let m=0;const w=t.slice(e,e+f);for(let h=0;h<f;++h)m+=w[h]*256**h;return e+=f,m},o=()=>l(1),s=()=>l(4),i=()=>{let f=t[e],m;for(m=0;t[e+m]>=128;++m)f^=128,f+=t[e+m+1]<<7*(m+1);const w=e+m+1,h=He(t.slice(w,w+f));return e+=f+m+1,h},d=()=>{const f=new ArrayBuffer(4),m=new DataView(f);for(let w=0;w<4;++w)m.setUint8(3-w,t[e+w]);return e+=4,m.getFloat32(0)},b=()=>{n.serialization={},n.serialization.rootId=s(),n.serialization.headerId=s(),n.serialization.majorVersion=s(),n.serialization.minorVersion=s()},g=()=>{n.binary={},n.binary.libraryId=s(),n.binary.libraryName=i()},c=f=>{const m={};m.objectId=s(),m.objectName=i(),m.memberCount=s(),m.members=[];for(let w=0;w<m.memberCount;++w)m.members.push({name:i()});for(let w=0;w<m.memberCount;++w)m.members[w].type=Kt(o());m.members.forEach(w=>{switch(w.type){case"SystemClass":w.typeName=i();break;case"Class":w.typeName=i(),w.libraryId=s();break;case"String":case"StringArray":break;case"Primitive":case"PrimitiveArray":w.typeName=De(o());break;default:throw new Error(w.type+" not handled")}}),f||(m.libraryId=s()),m.members.forEach(w=>{if(["SystemClass","Class","StringArray","PrimitiveArray"].indexOf(w.type)>-1){const h=o();switch(h){case 9:w.refId=s();break;default:throw new Error(w.type+" <"+h.toString(16).padStart(2,"0")+"> not handled")}}else if(w.type==="Primitive")switch(w.typeName){case"Single":w.value=d();break;case"Int32":w.value=s();break;default:throw console.log(w),new Error(w.typeName+" not handled")}else if(w.type==="String"){const h={};e++,h.type="BinaryObjectString",h.objectId=s(),h.value=i(),w.refId=h.objectId,r[h.objectId]=h}else throw new Error(w.type+" not handled")}),r[m.objectId]=m},k=()=>{const f={};f.objectId=s();const m=s(),w=r[m];f.objectName=w.objectName,f.memberCount=w.memberCount,f.members=Wt(w.members),f.members.forEach(h=>{if(["SystemClass","StringArray","PrimitiveArray"].indexOf(h.type)>-1){const y=o();switch(y){case 9:h.refId=s();break;default:throw new Error(h.type+" <"+y+"> not handled")}}else if(h.type==="Primitive")switch(h.typeName){case"Single":h.value=d();break;case"Int32":h.value=s();break;default:throw console.log(h),new Error(h.typeName+" not handled")}else if(h.type==="String"){const y={};e++,y.type="BinaryObjectString",y.objectId=s(),y.value=i(),h.refId=y.objectId,r[y.objectId]=y}else throw new Error(h.type+" not handled")}),r[f.objectId]=f},S=()=>{const f=s(),m=s();r[f]={objectId:f,length:m,values:[]};for(let w=0;w<m;++w){const h=o();switch(h){case 6:const y={};y.type="BinaryObjectString",y.objectId=s(),y.value=i(),r[y.objectId]=y,r[f].values.push({refId:y.objectId});break;case 9:r[f].values.push({refId:s()});break;case 13:const I=o();w+=I-1;for(let j=0;j<I;++j)r[f].values.push({value:null});break;default:throw new Error("ArraySingleString <"+h+"> not handled")}}t[e]==9&&(e++,r[f].refId=s())},v=()=>{const f={};f.objectId=s(),f.binaryTypeEnum=o(),f.rank=s(),f.lengths=[];for(let m=0;m<f.rank;++m)f.lengths.push(s());f.typeEnum=["Primitive","String","Object","SystemClass","Class","ObjectArray","StringArray","PrimitiveArray"][o()],f.typeEnum==="PrimitiveArray"?f.arrayTypeEnum=De(o()):f.typeEnum==="Class"&&(f.name=i(),f.libraryId=s()),f.values=[],f.lengths.forEach(m=>{for(let w=0;w<m;++w){const h=o();switch(h){case 9:f.values.push({refId:s()});break;case 10:f.values.push({value:null});break;case 13:const y=o();w+=y-1;for(let I=0;I<y;++I)f.values.push({value:null});break;default:throw console.log(f),new Error("BinaryArray <"+h+"> not handled")}}}),r[f.objectId]=f},_=()=>{const f={};f.objectId=s(),f.length=s(),f.primitiveTypeEnum=De(o()),f.values=[];for(let m=0;m<f.length;++m)switch(f.primitiveTypeEnum){case"Single":f.values.push({value:d()});break;case"Int32":f.values.push({value:s()});break;default:throw new Error(f.primitiveTypeEnum+" not handled")}r[f.objectId]=f},p=()=>{const f=h=>{if(h.value!==void 0)return h.value;if(h.values)return h.values.map(y=>f(y));if(h.members){const y={};return h.members.forEach(I=>m(y,I)),y}return h.refId?f(r[h.refId]):h},m=(h,y)=>{if(y.value!==void 0)return h[y.name]=y.value;const I=r[y.refId];I.value?h[y.name]=I.value:I.values?h[y.name]=I.values.map(f):I.members?(h[y.name]={},I.members.forEach(j=>m(h[y.name],j))):I.refId&&m(h,r[I.refId])},w={};return r[1].members.forEach(h=>m(w,h)),{failed:!1,name:r[1].objectName,data:w,_debug:{metadata:n,objs:r}}};for(;e<t.length;){const f=o();try{switch(f){case 0:b();break;case 1:k();break;case 4:case 5:c(f===4);break;case 7:v();break;case 12:g();break;case 15:_();break;case 17:S();break;case 11:return p();default:return console.log("Unrecognized",e,"0x"+f.toString(16),n,r),{failed:!0,offset:e,_debug:{metadata:n,objs:r}}}}catch(m){return console.error(m),{failed:!0,offset:e,_debug:{metadata:n,objs:r}}}}return{failed:!0,offset:e,_debug:{metadata:n,objs:r}}},K=(t,e,n=!1)=>{const l=60/t*Math.max(0,e),o=String(Math.floor(l/60)),s=String(Math.floor(l%60)).padStart(2,"0");if(!n)return`${o}:${s}`;const i=String(Math.floor(l%1*1e3)).padStart(3,"0");return`${o}:${s}.${i}`};function pt(t,e,n){const r=t.slice();return r[3]=e[n],r}function Xt(t){let e,n=t[3].measure+"",r,l,o,s,i=t[3].offset+"",d,b,g,c,k=K(t[1].tempo,t[3].offset,!0)+"",S,v;return{c(){e=L("text"),r=$(n),o=C(),s=L("text"),d=$(i),g=C(),c=L("text"),S=$(k),a(e,"class","measure svelte-hmwcyk"),a(e,"x",l=2+t[3].offset*t[0]),a(e,"y",20),a(s,"class","offset svelte-hmwcyk"),a(s,"x",b=2+t[3].offset*t[0]),a(s,"y",40),a(c,"class","timestamp svelte-hmwcyk"),a(c,"x",v=2+t[3].offset*t[0]),a(c,"y",60)},m(_,p){A(_,e,p),u(e,r),A(_,o,p),A(_,s,p),u(s,d),A(_,g,p),A(_,c,p),u(c,S)},p(_,p){p&1&&l!==(l=2+_[3].offset*_[0])&&a(e,"x",l),p&1&&b!==(b=2+_[3].offset*_[0])&&a(s,"x",b),p&2&&k!==(k=K(_[1].tempo,_[3].offset,!0)+"")&&N(S,k),p&1&&v!==(v=2+_[3].offset*_[0])&&a(c,"x",v)},d(_){_&&z(e),_&&z(o),_&&z(s),_&&z(g),_&&z(c)}}}function _t(t){let e,n,r,l,o,s=t[3].measure&&Xt(t);return{c(){e=L("line"),l=C(),s&&s.c(),o=Ie(),a(e,"x1",n=t[3].offset*t[0]),a(e,"x2",r=t[3].offset*t[0]),a(e,"y1",0),a(e,"y2",1e3),a(e,"stroke",t[3].color),a(e,"stroke-width",t[3].width)},m(i,d){A(i,e,d),A(i,l,d),s&&s.m(i,d),A(i,o,d)},p(i,d){d&1&&n!==(n=i[3].offset*i[0])&&a(e,"x1",n),d&1&&r!==(r=i[3].offset*i[0])&&a(e,"x2",r),i[3].measure&&s.p(i,d)},d(i){i&&z(e),i&&z(l),s&&s.d(i),i&&z(o)}}}function Yt(t){let e,n=t[2](),r=[];for(let l=0;l<n.length;l+=1)r[l]=_t(pt(t,n,l));return{c(){for(let l=0;l<r.length;l+=1)r[l].c();e=Ie()},m(l,o){for(let s=0;s<r.length;s+=1)r[s].m(l,o);A(l,e,o)},p(l,[o]){if(o&7){n=l[2]();let s;for(s=0;s<n.length;s+=1){const i=pt(l,n,s);r[s]?r[s].p(i,o):(r[s]=_t(i),r[s].c(),r[s].m(e.parentNode,e))}for(;s<r.length;s+=1)r[s].d(1);r.length=n.length}},i:T,o:T,d(l){W(r,l),l&&z(e)}}}function qt(t,e,n){let{zoom:r=150}=e,{chart:l}=e;const o=()=>{const s={};for(let i=0;i<=l.endpoint;i+=.25)s[i]={width:1,color:"#fff2",offset:i};for(let i=0;i<=l.endpoint;i+=.5)s[i]={width:1,color:"#fff6",offset:i};for(let i=0;i<l.endpoint;i+=1)s[i]={width:2,color:"#fff8",offset:i};for(let i=0;i<l.endpoint;i+=l.timesig)s[i]={width:3,color:"#fffa",offset:i,measure:1+i/l.timesig};return Object.values(s).sort((i,d)=>i.offset-d.offset)};return t.$$set=s=>{"zoom"in s&&n(0,r=s.zoom),"chart"in s&&n(1,l=s.chart)},[r,l,o]}class Qt extends q{constructor(e){super(),Y(this,e,qt,Yt,X,{zoom:0,chart:1})}}function vt(t,e,n){const r=t.slice();return r[8]=e[n][0],r[9]=e[n][1],r[10]=e[n][2],r[11]=e[n][3],r[12]=e[n][4],r[14]=n,r}function gt(t,e,n){const r=t.slice();return r[8]=e[n][0],r[9]=e[n][1],r[10]=e[n][2],r[11]=e[n][3],r[12]=e[n][4],r[14]=n,r}function bt(t){let e,n,r,l,o;return{c(){e=L("line"),a(e,"x1",n=t[3](t[8]+t[9])-3),a(e,"x2",r=t[3](t[8]+t[9])),a(e,"y1",l=t[4](t[12])),a(e,"y2",o=t[4](t[12])),a(e,"stroke","#fff"),a(e,"stroke-width",25),a(e,"stroke-linecap","round")},m(s,i){A(s,e,i)},p(s,i){i&4&&n!==(n=s[3](s[8]+s[9])-3)&&a(e,"x1",n),i&4&&r!==(r=s[3](s[8]+s[9]))&&a(e,"x2",r),i&4&&l!==(l=s[4](s[12]))&&a(e,"y1",l),i&4&&o!==(o=s[4](s[12]))&&a(e,"y2",o)},d(s){s&&z(e)}}}function yt(t){let e,n,r=(!t[2].notes[t[14]+1]||t[8]+t[9]<t[2].notes[t[14]+1][0])&&bt(t);return{c(){r&&r.c(),e=L("path"),a(e,"fill","none"),a(e,"stroke","#fff"),a(e,"stroke-width",25),a(e,"stroke-linecap","butt"),a(e,"d",n=t[11]?t[6](t[8],t[9],t[10],t[11],t[12]):`M${t[3](t[8])},${t[4](t[10])} l${t[5](t[9])},0`)},m(l,o){r&&r.m(l,o),A(l,e,o)},p(l,o){!l[2].notes[l[14]+1]||l[8]+l[9]<l[2].notes[l[14]+1][0]?r?r.p(l,o):(r=bt(l),r.c(),r.m(e.parentNode,e)):r&&(r.d(1),r=null),o&4&&n!==(n=l[11]?l[6](l[8],l[9],l[10],l[11],l[12]):`M${l[3](l[8])},${l[4](l[10])} l${l[5](l[9])},0`)&&a(e,"d",n)},d(l){r&&r.d(l),l&&z(e)}}}function kt(t){let e,n,r;return{c(){e=L("path"),a(e,"fill","none"),a(e,"marker-start",n=t[2].notes[t[14]-1]&&t[2].notes[t[14]-1][0]+t[2].notes[t[14]-1][1]>=t[8]?"url(#note-mid)":"url(#note-start)"),a(e,"stroke","#5566aa"),a(e,"stroke-width",20),a(e,"stroke-linecap","round"),a(e,"d",r=t[11]?t[6](t[8],t[9],t[10],t[11],t[12]):`M${t[3](t[8])},${t[4](t[10])} l${t[5](t[9])},0`)},m(l,o){A(l,e,o)},p(l,o){o&4&&n!==(n=l[2].notes[l[14]-1]&&l[2].notes[l[14]-1][0]+l[2].notes[l[14]-1][1]>=l[8]?"url(#note-mid)":"url(#note-start)")&&a(e,"marker-start",n),o&4&&r!==(r=l[11]?l[6](l[8],l[9],l[10],l[11],l[12]):`M${l[3](l[8])},${l[4](l[10])} l${l[5](l[9])},0`)&&a(e,"d",r)},d(l){l&&z(e)}}}function Zt(t){let e,n,r,l,o,s,i,d,b,g;i=new Qt({props:{zoom:t[0],chart:t[2]}});let c=t[2].notes,k=[];for(let _=0;_<c.length;_+=1)k[_]=yt(gt(t,c,_));let S=t[2].notes,v=[];for(let _=0;_<S.length;_+=1)v[_]=kt(vt(t,S,_));return{c(){e=L("svg"),n=L("defs"),r=L("marker"),l=L("circle"),o=L("marker"),s=L("circle"),ue(i.$$.fragment);for(let _=0;_<k.length;_+=1)k[_].c();d=Ie();for(let _=0;_<v.length;_+=1)v[_].c();a(l,"cx",50),a(l,"cy",50),a(l,"r",45),a(l,"stroke","#fff"),a(l,"stroke-width",10),a(l,"fill","#5566aa"),a(r,"id","note-start"),a(r,"refX",50),a(r,"refY",50),a(r,"markerHeight",2),a(r,"markerWidth",2),a(r,"viewBox","0 0 100 100"),a(s,"cx",50),a(s,"cy",50),a(s,"r",10),a(s,"stroke","#fff"),a(s,"stroke-width",5),a(s,"fill","#5566aa"),a(o,"id","note-mid"),a(o,"refX",50),a(o,"refY",50),a(o,"markerHeight",2),a(o,"markerWidth",2),a(o,"viewBox","0 0 100 100"),a(e,"class","note-container svelte-2uaize"),a(e,"viewBox",b=`${t[1]*t[0]} 0 3000 1000`)},m(_,p){A(_,e,p),u(e,n),u(n,r),u(r,l),u(n,o),u(o,s),H(i,e,null);for(let f=0;f<k.length;f+=1)k[f].m(e,null);u(e,d);for(let f=0;f<v.length;f+=1)v[f].m(e,null);g=!0},p(_,[p]){const f={};if(p&1&&(f.zoom=_[0]),p&4&&(f.chart=_[2]),i.$set(f),p&124){c=_[2].notes;let m;for(m=0;m<c.length;m+=1){const w=gt(_,c,m);k[m]?k[m].p(w,p):(k[m]=yt(w),k[m].c(),k[m].m(e,d))}for(;m<k.length;m+=1)k[m].d(1);k.length=c.length}if(p&124){S=_[2].notes;let m;for(m=0;m<S.length;m+=1){const w=vt(_,S,m);v[m]?v[m].p(w,p):(v[m]=kt(w),v[m].c(),v[m].m(e,null))}for(;m<v.length;m+=1)v[m].d(1);v.length=S.length}(!g||p&3&&b!==(b=`${_[1]*_[0]} 0 3000 1000`))&&a(e,"viewBox",b)},i(_){g||(F(i.$$.fragment,_),g=!0)},o(_){U(i.$$.fragment,_),g=!1},d(_){_&&z(e),V(i),W(k,_),W(v,_)}}}const wt=2.4;function xt(t,e,n){let{zoom:r=150}=e,{offset:l=0}=e,{chart:o}=e;const s=wt/2,i=c=>c*r,d=c=>500-c*wt,b=c=>c*r,g=(c,k,S,v,_)=>{const p=`M${i(c)},${d(S)}`,f=`s${b(k)/4},0 ${b(k)/2},${-v*s}`,m=`s${b(k)/2},${-v*s} ${b(k)/2},${-v*s}`;return`${p} ${f} ${m}`};return t.$$set=c=>{"zoom"in c&&n(0,r=c.zoom),"offset"in c&&n(1,l=c.offset),"chart"in c&&n(2,o=c.chart)},[r,l,o,i,d,b,g]}class en extends q{constructor(e){super(),Y(this,e,xt,Zt,X,{zoom:0,offset:1,chart:2})}}const tn=[{name:"C3",pitch:48,octave:!0},{name:"C#3",pitch:49,sharp:!0},{name:"D3",pitch:50},{name:"D#3",pitch:51,sharp:!0},{name:"E3",pitch:52},{name:"F3",pitch:53},{name:"F#3",pitch:54,sharp:!0},{name:"G3",pitch:55},{name:"G#3",pitch:56,sharp:!0},{name:"A3",pitch:57},{name:"A#3",pitch:58,sharp:!0},{name:"B3",pitch:59},{name:"C4",pitch:60,octave:!0},{name:"C#4",pitch:61,sharp:!0},{name:"D4",pitch:62},{name:"D#4",pitch:63,sharp:!0},{name:"E4",pitch:64},{name:"F4",pitch:65},{name:"F#4",pitch:66,sharp:!0},{name:"G4",pitch:67},{name:"G#4",pitch:68,sharp:!0},{name:"A4",pitch:69},{name:"A#4",pitch:70,sharp:!0},{name:"B4",pitch:71},{name:"C5",pitch:72,octave:!0}],Se=tn.sort((t,e)=>e.pitch-t.pitch);function St(t,e,n){const r=t.slice();return r[0]=e[n],r}function Et(t,e,n){const r=t.slice();return r[0]=e[n],r}function $t(t){let e;return{c(){e=E("div"),a(e,"class","pitch svelte-5gtemr"),mt(e,"sharp",t[0].sharp),mt(e,"octave",t[0].octave)},m(n,r){A(n,e,r)},p:T,d(n){n&&z(e)}}}function It(t){let e,n=t[0].name+"",r;return{c(){e=E("div"),r=$(n),a(e,"class","text svelte-5gtemr")},m(l,o){A(l,e,o),u(e,r)},p:T,d(l){l&&z(e)}}}function nn(t){let e,n,r,l=Se,o=[];for(let d=0;d<l.length;d+=1)o[d]=$t(Et(t,l,d));let s=Se,i=[];for(let d=0;d<s.length;d+=1)i[d]=It(St(t,s,d));return{c(){e=E("div");for(let d=0;d<o.length;d+=1)o[d].c();n=C(),r=E("div");for(let d=0;d<i.length;d+=1)i[d].c();a(e,"class","vertical-grid svelte-5gtemr"),a(r,"class","note-names svelte-5gtemr")},m(d,b){A(d,e,b);for(let g=0;g<o.length;g+=1)o[g].m(e,null);A(d,n,b),A(d,r,b);for(let g=0;g<i.length;g+=1)i[g].m(r,null)},p(d,[b]){if(b&0){l=Se;let g;for(g=0;g<l.length;g+=1){const c=Et(d,l,g);o[g]?o[g].p(c,b):(o[g]=$t(c),o[g].c(),o[g].m(e,null))}for(;g<o.length;g+=1)o[g].d(1);o.length=l.length}if(b&0){s=Se;let g;for(g=0;g<s.length;g+=1){const c=St(d,s,g);i[g]?i[g].p(c,b):(i[g]=It(c),i[g].c(),i[g].m(r,null))}for(;g<i.length;g+=1)i[g].d(1);i.length=s.length}},i:T,o:T,d(d){d&&z(e),W(o,d),d&&z(n),d&&z(r),W(i,d)}}}class ln extends q{constructor(e){super(),Y(this,e,null,nn,X,{})}}function jt(t,e,n){const r=t.slice();return r[10]=e[n].width,r[11]=e[n].color,r}function Ct(t){let e;return{c(){e=E("div"),a(e,"class","beatline svelte-1p6kpfk"),G(e,"border-width",t[10]),G(e,"border-color",t[11])},m(n,r){A(n,e,r)},p:T,d(n){n&&z(e)}}}function rn(t){let e,n,r,l=Math.max(0,t[0]).toFixed(2)+"",o,s,i=t[1].endpoint+"",d,b,g,c=K(t[1].tempo,t[0],!0)+"",k,S,v,_,p,f,m,w=t[4](),h=[];for(let y=0;y<w.length;y+=1)h[y]=Ct(jt(t,w,y));return{c(){e=E("div"),n=E("div"),r=E("div"),o=$(l),s=$("/"),d=$(i),b=C(),g=E("div"),k=$(c),S=C(),v=E("div");for(let y=0;y<h.length;y+=1)h[y].c();_=C(),p=E("div"),a(n,"class","info svelte-1p6kpfk"),a(p,"class","position svelte-1p6kpfk"),G(p,"left",`${100*Math.max(0,t[0])/t[1].endpoint}%`),G(p,"width",`${Math.max(3,2e4/t[1].endpoint)}px`),a(v,"class","seeker svelte-1p6kpfk"),a(e,"class","seeker-container svelte-1p6kpfk")},m(y,I){A(y,e,I),u(e,n),u(n,r),u(r,o),u(r,s),u(r,d),u(n,b),u(n,g),u(g,k),u(e,S),u(e,v);for(let j=0;j<h.length;j+=1)h[j].m(v,null);u(v,_),u(v,p),t[6](e),f||(m=P(e,"mousedown",t[3]),f=!0)},p(y,[I]){if(I&1&&l!==(l=Math.max(0,y[0]).toFixed(2)+"")&&N(o,l),I&2&&i!==(i=y[1].endpoint+"")&&N(d,i),I&3&&c!==(c=K(y[1].tempo,y[0],!0)+"")&&N(k,c),I&16){w=y[4]();let j;for(j=0;j<w.length;j+=1){const B=jt(y,w,j);h[j]?h[j].p(B,I):(h[j]=Ct(B),h[j].c(),h[j].m(v,_))}for(;j<h.length;j+=1)h[j].d(1);h.length=w.length}I&3&&G(p,"left",`${100*Math.max(0,y[0])/y[1].endpoint}%`),I&2&&G(p,"width",`${Math.max(3,2e4/y[1].endpoint)}px`)},i:T,o:T,d(y){y&&z(e),W(h,y),t[6](null),f=!1,m()}}}function sn(t,e,n){let{offset:r=0}=e,{chart:l}=e,{onSeek:o=()=>{}}=e,s;const i=S=>{if(S<95)return o(-2);const v=Math.min(1,(S-95)/(s.clientWidth-95));o(v*l.endpoint)},d=S=>{S.preventDefault();const{clientX:v}=S;window.requestAnimationFrame(()=>i(v))},b=S=>{const{clientX:v}=S;i(v),window.addEventListener("mousemove",d),window.addEventListener("mouseup",g)},g=()=>{window.removeEventListener("mousemove",d),window.removeEventListener("mouseup",g)},c=()=>{const S={};for(let v=0;v<l.endpoint;v+=l.timesig*10)S[v]={offset:v,width:"1px",color:"#fff3"};for(let v=0;v<l.endpoint;v+=l.timesig*100)S[v]={offset:v,width:"2px",color:"#fff6"};return Object.values(S).sort((v,_)=>v.offset-_.offset)};function k(S){Ue[S?"unshift":"push"](()=>{s=S,n(2,s)})}return t.$$set=S=>{"offset"in S&&n(0,r=S.offset),"chart"in S&&n(1,l=S.chart),"onSeek"in S&&n(5,o=S.onSeek)},[r,l,s,b,c,o,k]}class on extends q{constructor(e){super(),Y(this,e,sn,rn,X,{offset:0,chart:1,onSeek:5})}}function an(t){let e,n,r=t[0].author+"",l,o,s=t[0].name+"",i,d,b,g,c=t[0].tempo+"",k,S,v=t[0].timesig+"",_,p,f=K(t[0].tempo,t[0].endpoint)+"",m,w,h,y,I;return{c(){e=E("div"),n=E("div"),l=$(r),o=$(" - "),i=$(s),d=C(),b=E("div"),g=$("\u2669 = "),k=$(c),S=$(" | "),_=$(v),p=$("/4 | "),m=$(f),w=$(" | "),h=E("a"),h.textContent="See more",a(n,"class","title"),a(h,"href","javascript:void(0)"),a(h,"class","svelte-hz6umn"),a(b,"class","tempo"),a(e,"class","metadata svelte-hz6umn")},m(j,B){A(j,e,B),u(e,n),u(n,l),u(n,o),u(n,i),u(e,d),u(e,b),u(b,g),u(b,k),u(b,S),u(b,_),u(b,p),u(b,m),u(b,w),u(b,h),y||(I=P(h,"click",t[2]),y=!0)},p(j,B){B&1&&r!==(r=j[0].author+"")&&N(l,r),B&1&&s!==(s=j[0].name+"")&&N(i,s),B&1&&c!==(c=j[0].tempo+"")&&N(k,c),B&1&&v!==(v=j[0].timesig+"")&&N(_,v),B&1&&f!==(f=K(j[0].tempo,j[0].endpoint)+"")&&N(m,f)},d(j){j&&z(e),y=!1,I()}}}function fn(t){let e,n,r,l,o,s,i=t[0].author+"",d,b,g,c,k,S,v=t[0].name+"",_,p,f,m,w,h,y=t[0].description+"",I,j,B,Ve,de=t[0].shortName+"",je,We,Q,Ke,me=t[0].trackRef+"",Ce,Je,Z,Xe,he=t[0].genre+"",ze,Ye,x,qe,pe=t[0].year+"",Ae,Qe,ee,Ze,_e=t[0].difficulty+"",Ne,xe,te,et,ve=t[0].savednotespacing+"",Me,tt,ne,nt,ge=t[0].tempo+"",Te,lt,le,rt,be=t[0].timesig+"",Be,st,re,ot,ye=t[0].endpoint+"",Oe,it,se,at,ke=t[0].UNK1+"",Le,ft,oe,ut,R,Pe,ct;return{c(){e=E("div"),n=E("ul"),r=E("li"),l=E("div"),l.textContent="author",o=C(),s=E("div"),d=$(i),b=C(),g=E("li"),c=E("div"),c.textContent="name",k=C(),S=E("div"),_=$(v),p=C(),f=E("li"),m=E("div"),m.textContent="description",w=C(),h=E("div"),I=$(y),j=C(),B=E("li"),Ve=$("shortName = "),je=$(de),We=C(),Q=E("li"),Ke=$("trackRef = "),Ce=$(me),Je=C(),Z=E("li"),Xe=$("genre = "),ze=$(he),Ye=C(),x=E("li"),qe=$("year = "),Ae=$(pe),Qe=C(),ee=E("li"),Ze=$("difficulty = "),Ne=$(_e),xe=C(),te=E("li"),et=$("savednotespacing = "),Me=$(ve),tt=C(),ne=E("li"),nt=$("tempo = "),Te=$(ge),lt=C(),le=E("li"),rt=$("timesig = "),Be=$(be),st=C(),re=E("li"),ot=$("endpoint = "),Oe=$(ye),it=C(),se=E("li"),at=$("UNK1 = "),Le=$(ke),ft=C(),oe=E("li"),ut=E("br"),R=E("a"),R.textContent="Hide details",a(l,"class","metadata-label"),a(s,"class","metadata-value svelte-hz6umn"),a(r,"class","svelte-hz6umn"),a(c,"class","metadata-label"),a(S,"class","metadata-value svelte-hz6umn"),a(g,"class","svelte-hz6umn"),a(m,"class","metadata-label"),a(h,"class","metadata-value svelte-hz6umn"),a(f,"class","svelte-hz6umn"),a(B,"class","svelte-hz6umn"),a(Q,"class","svelte-hz6umn"),a(Z,"class","svelte-hz6umn"),a(x,"class","svelte-hz6umn"),a(ee,"class","svelte-hz6umn"),a(te,"class","svelte-hz6umn"),a(ne,"class","svelte-hz6umn"),a(le,"class","svelte-hz6umn"),a(re,"class","svelte-hz6umn"),a(se,"class","svelte-hz6umn"),a(R,"href","javascript:void(0)"),a(R,"class","svelte-hz6umn"),a(oe,"class","svelte-hz6umn"),a(n,"class","metadata-list svelte-hz6umn"),a(e,"class","metadata-details svelte-hz6umn")},m(M,O){A(M,e,O),u(e,n),u(n,r),u(r,l),u(r,o),u(r,s),u(s,d),u(n,b),u(n,g),u(g,c),u(g,k),u(g,S),u(S,_),u(n,p),u(n,f),u(f,m),u(f,w),u(f,h),u(h,I),u(n,j),u(n,B),u(B,Ve),u(B,je),u(n,We),u(n,Q),u(Q,Ke),u(Q,Ce),u(n,Je),u(n,Z),u(Z,Xe),u(Z,ze),u(n,Ye),u(n,x),u(x,qe),u(x,Ae),u(n,Qe),u(n,ee),u(ee,Ze),u(ee,Ne),u(n,xe),u(n,te),u(te,et),u(te,Me),u(n,tt),u(n,ne),u(ne,nt),u(ne,Te),u(n,lt),u(n,le),u(le,rt),u(le,Be),u(n,st),u(n,re),u(re,ot),u(re,Oe),u(n,it),u(n,se),u(se,at),u(se,Le),u(n,ft),u(n,oe),u(oe,ut),u(oe,R),Pe||(ct=P(R,"click",t[2]),Pe=!0)},p(M,O){O&1&&i!==(i=M[0].author+"")&&N(d,i),O&1&&v!==(v=M[0].name+"")&&N(_,v),O&1&&y!==(y=M[0].description+"")&&N(I,y),O&1&&de!==(de=M[0].shortName+"")&&N(je,de),O&1&&me!==(me=M[0].trackRef+"")&&N(Ce,me),O&1&&he!==(he=M[0].genre+"")&&N(ze,he),O&1&&pe!==(pe=M[0].year+"")&&N(Ae,pe),O&1&&_e!==(_e=M[0].difficulty+"")&&N(Ne,_e),O&1&&ve!==(ve=M[0].savednotespacing+"")&&N(Me,ve),O&1&&ge!==(ge=M[0].tempo+"")&&N(Te,ge),O&1&&be!==(be=M[0].timesig+"")&&N(Be,be),O&1&&ye!==(ye=M[0].endpoint+"")&&N(Oe,ye),O&1&&ke!==(ke=M[0].UNK1+"")&&N(Le,ke)},d(M){M&&z(e),Pe=!1,ct()}}}function un(t){let e;function n(o,s){return o[1]?fn:an}let r=n(t),l=r(t);return{c(){l.c(),e=Ie()},m(o,s){l.m(o,s),A(o,e,s)},p(o,[s]){r===(r=n(o))&&l?l.p(o,s):(l.d(1),l=r(o),l&&(l.c(),l.m(e.parentNode,e)))},i:T,o:T,d(o){l.d(o),o&&z(e)}}}function cn(t,e,n){let{chart:r}=e,l=!1;const o=()=>{n(1,l=!l)};return t.$$set=s=>{"chart"in s&&n(0,r=s.chart)},[r,l,o]}class dn extends q{constructor(e){super(),Y(this,e,cn,un,X,{chart:0})}}function zt(t){let e;return{c(){e=E("div"),a(e,"class","dragover-overlay svelte-17cf605")},m(n,r){A(n,e,r)},d(n){n&&z(e)}}}function mn(t){let e,n,r,l,o,s;return{c(){e=E("label"),n=E("p"),n.textContent="Drag chart files here or click to upload",r=C(),l=E("input"),a(l,"id","file-input"),a(l,"type","file"),a(e,"class","instructions svelte-17cf605"),a(e,"for","file-input")},m(i,d){A(i,e,d),u(e,n),u(e,r),u(e,l),o||(s=P(l,"change",t[4]),o=!0)},p:T,i:T,o:T,d(i){i&&z(e),o=!1,s()}}}function hn(t){let e,n,r,l,o,s,i,d,b,g;return e=new on({props:{offset:t[1],chart:t[2],onSeek:t[7]}}),r=new en({props:{zoom:_n,offset:t[1],chart:t[2]}}),o=new dn({props:{chart:t[2]}}),{c(){ue(e.$$.fragment),n=C(),ue(r.$$.fragment),l=C(),ue(o.$$.fragment),s=C(),i=E("button"),i.textContent="\u{1F5D1}\uFE0F",a(i,"class","unload svelte-17cf605"),a(i,"title","Unload the chart")},m(c,k){H(e,c,k),A(c,n,k),H(r,c,k),A(c,l,k),H(o,c,k),A(c,s,k),A(c,i,k),d=!0,b||(g=P(i,"click",t[3]),b=!0)},p(c,k){const S={};k&2&&(S.offset=c[1]),k&4&&(S.chart=c[2]),e.$set(S);const v={};k&2&&(v.offset=c[1]),k&4&&(v.chart=c[2]),r.$set(v);const _={};k&4&&(_.chart=c[2]),o.$set(_)},i(c){d||(F(e.$$.fragment,c),F(r.$$.fragment,c),F(o.$$.fragment,c),d=!0)},o(c){U(e.$$.fragment,c),U(r.$$.fragment,c),U(o.$$.fragment,c),d=!1},d(c){V(e,c),c&&z(n),V(r,c),c&&z(l),V(o,c),c&&z(s),c&&z(i),b=!1,g()}}}function pn(t){let e,n,r,l,o,s,i,d,b,g,c,k=t[0]&&zt();r=new ln({});const S=[hn,mn],v=[];function _(p,f){return p[2]?0:1}return i=_(t),d=v[i]=S[i](t),{c(){e=E("main"),k&&k.c(),n=C(),ue(r.$$.fragment),l=C(),o=E("div"),s=C(),d.c(),a(o,"class","strikeline svelte-17cf605"),a(e,"class","svelte-17cf605")},m(p,f){A(p,e,f),k&&k.m(e,null),u(e,n),H(r,e,null),u(e,l),u(e,o),u(e,s),v[i].m(e,null),b=!0,g||(c=[P(e,"dragover",t[8]),P(e,"drop",t[5]),P(e,"wheel",t[6])],g=!0)},p(p,[f]){p[0]?k||(k=zt(),k.c(),k.m(e,n)):k&&(k.d(1),k=null);let m=i;i=_(p),i===m?v[i].p(p,f):(Ut(),U(v[m],1,1,()=>{v[m]=null}),Rt(),d=v[i],d?d.p(p,f):(d=v[i]=S[i](p),d.c()),F(d,1),d.m(e,null))},i(p){b||(F(r.$$.fragment,p),F(d),b=!0)},o(p){U(r.$$.fragment,p),U(d),b=!1},d(p){p&&z(e),k&&k.d(),V(r),v[i].d(),g=!1,J(c)}}}let _n=200,ie=.5;function vn(t,e,n){let r=!1,l=0,o=null;const s=p=>{const f=new FileReader;p.name.endsWith(".tmb")&&(f.onload=m=>{const w=m.target.result,h=new Uint8Array(w);if(String.fromCharCode(h[0])=="{")n(2,o=JSON.parse(String.fromCharCode(...h)));else{const y=Jt(h);if(y.failed)throw new Error("Failed to parse NRBF");n(2,o={author:"Trombone Champ",name:p.name.split(".")[0],description:"Base game .tmb (not a JSON)",shortName:p.name.split(".")[0],trackRef:p.name.split(".")[0],genre:"?",year:"?",difficulty:-1,savednotespacing:y.data.savednotespacing,tempo:y.data.tempo,timesig:y.data.timesig,endpoint:y.data.endpoint,UNK1:0,notes:y.data.savedleveldata._items.filter(I=>I)})}n(2,o.timesig=Number(o.timesig),o),console.log(o),n(1,l=-2)},f.readAsArrayBuffer(p))},i=()=>{n(2,o=null)},d=p=>{if(!(!p.target.files||!p.target.files.length))for(const f of p.target.files)s(f)},b=p=>{if(p.preventDefault(),n(0,r=!1),!(!p.dataTransfer.items||!p.dataTransfer.items.length))for(const f of p.dataTransfer.items)s(f.getAsFile())},g=()=>{const p=l%ie;n(1,l=Math.max(-2,l-(p||ie)))},c=()=>{const p=l%ie;n(1,l=Math.min(o.endpoint-2,l+(p?ie-p:ie)))},k=p=>{p.preventDefault(),o&&(p.deltaY>0?c():g())},S=p=>{switch(p.key){case"ArrowRight":c();break;case"ArrowLeft":g();break}},v=p=>{!o||n(1,l=p)};return Lt(()=>window.addEventListener("keydown",S)),[r,l,o,i,d,b,k,v,p=>{p.preventDefault(),n(0,r=!0)}]}class gn extends q{constructor(e){super(),Y(this,e,vn,pn,X,{})}}new gn({target:document.getElementById("app")});