import * as T from '../9-three.module.min.js';
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const scenes=[];window.__cinematic={ready:0,frames:0,errors:[]};
const mint=0x88e3dd;
function build(host,kind,index){
 try{
 const canvas=document.createElement('canvas');canvas.className='cinema-canvas';canvas.setAttribute('aria-label','Animated conceptual '+kind+' illustration, not actual hardware');host.append(canvas);
 const r=new T.WebGLRenderer({canvas,alpha:true,antialias:true});r.setPixelRatio(Math.min(devicePixelRatio,1.75));r.setClearColor(0,0);r.outputColorSpace=T.SRGBColorSpace;r.toneMapping=T.ACESFilmicToneMapping;r.toneMappingExposure=1.5;
 const scene=new T.Scene(),camera=new T.PerspectiveCamera(35,1,.1,100);camera.position.set(0,2,8);camera.lookAt(0,0,0);const g=new T.Group();scene.add(g);
 scene.add(new T.HemisphereLight(0xd7ffff,0x071718,2.4));const l=new T.PointLight(mint,48,18);l.position.set(3,4,3);scene.add(l);const white=new T.DirectionalLight(0xffffff,4);white.position.set(-3,4,3);scene.add(white);
 const metal=new T.MeshStandardMaterial({color:0x244747,metalness:.8,roughness:.24});const pale=new T.MeshStandardMaterial({color:0xceeeeb,metalness:.65,roughness:.18});const glow=new T.MeshStandardMaterial({color:mint,emissive:mint,emissiveIntensity:2,roughness:.35});const glass=new T.MeshPhysicalMaterial({color:0x67bdb6,metalness:.25,roughness:.16,transparent:true,opacity:.32,side:T.DoubleSide,depthWrite:false});
 const mesh=(geo,mat=metal,parent=g)=>{const o=new T.Mesh(geo,mat);parent.add(o);return o};
 const ring=(radius,tube=.024,mat=glow)=>mesh(new T.TorusGeometry(radius,tube,12,100),mat);
 let core,parts=[],packets=[],routes=[];
 if(kind==='engine'){
  core=mesh(new T.IcosahedronGeometry(.8,1),pale);const cage=mesh(new T.IcosahedronGeometry(1.12,0),glass);parts.push(cage);
  for(let i=0;i<4;i++){const o=ring(1.45+i*.22,.014,i%2?glass:glow);o.rotation.set(i*.62,.6+i*.35,.2);parts.push(o)}
  for(let i=0;i<3;i++){const a=i*Math.PI*2/3;const node=mesh(new T.OctahedronGeometry(.19,0),glow);node.position.set(Math.cos(a)*2.8,Math.sin(a)*1.35,-.3);parts.push(node);const pts=[];for(let j=0;j<=40;j++){let p=j/40;pts.push(new T.Vector3(node.position.x*(1-p),node.position.y*(1-p)+Math.sin(p*Math.PI)*.4,node.position.z*(1-p)))}const curve=new T.CatmullRomCurve3(pts);routes.push(curve);mesh(new T.TubeGeometry(curve,40,.012,6,false),glass);for(let k=0;k<5;k++){const dot=mesh(new T.SphereGeometry(.04,10,10),glow);packets.push({dot,curve,offset:k/5+i*.13})}}
 }else if(kind==='software'||kind==='rules'){
  for(let i=0;i<5;i++){const o=mesh(new T.CylinderGeometry(1.1,1.1,.12,6),i===2?glow:metal);o.position.y=(i-2)*.29;o.rotation.y=Math.PI/6;parts.push(o)}core=parts[2];const halo=ring(1.6,.018,glow);halo.rotation.x=Math.PI/2;parts.push(halo);
  for(let i=0;i<18;i++){const q=mesh(new T.OctahedronGeometry(.045),glow);q.position.set(Math.cos(i)*1.65,Math.sin(i*.7)*.6,Math.sin(i)*1.65);packets.push({dot:q,orbit:i})}
 }else if(kind==='account'){
  const shape=new T.Shape();shape.moveTo(0,1.3);shape.bezierCurveTo(.4,1.1,1.1,1.1,1.1,.9);shape.lineTo(1,-.2);shape.bezierCurveTo(.9,-.8,.2,-1.25,0,-1.4);shape.bezierCurveTo(-.2,-1.25,-.9,-.8,-1,-.2);shape.lineTo(-1.1,.9);shape.bezierCurveTo(-1.1,1.1,-.4,1.1,0,1.3);
  core=mesh(new T.ExtrudeGeometry(shape,{depth:.22,bevelEnabled:true,bevelThickness:.08,bevelSize:.06,bevelSegments:3,steps:1}),pale);core.rotation.y=-.4;
  const medallion=mesh(new T.TorusGeometry(.38,.075,16,64),glow);medallion.position.set(0,.12,.4);const pin=mesh(new T.CapsuleGeometry(.065,.25,4,12),metal);pin.position.set(0,-.3,.44);parts.push(medallion);const halo=ring(1.7,.018,glass);halo.rotation.y=.6;parts.push(halo);
 }else if(kind==='intake'){
  core=mesh(new T.ConeGeometry(.8,1.7,5,1,true),glass);core.rotation.z=Math.PI;const rim=ring(.82,.025,glow);rim.rotation.x=Math.PI/2;rim.position.y=.85;parts.push(rim);
  for(let i=0;i<28;i++){const dot=mesh(new T.OctahedronGeometry(.055),i%4===0?pale:glow);packets.push({dot,stream:i/28})}
 }else if(kind==='connection'){
  core=ring(.75,.12,pale);core.position.x=-.5;core.rotation.y=.5;const second=ring(.75,.12,glow);second.position.x=.5;second.rotation.y=-.5;parts.push(second);for(let i=0;i<12;i++){const dot=mesh(new T.SphereGeometry(.035,8,8),glow);packets.push({dot,link:i/12})}
 }else if(kind==='operations'){
  core=mesh(new T.CylinderGeometry(1.3,1.3,.15,64),metal);core.position.y=-.5;
  for(let i=0;i<3;i++){const o=ring(.45+i*.35,.016,glow);o.rotation.x=Math.PI/2;o.position.y=-.4;parts.push(o)}
  for(let i=0;i<5;i++){const tower=mesh(new T.CapsuleGeometry(.08,.3+i*.12,4,12),pale);tower.position.set(Math.cos(i*1.25)*.85,i*.06-.1,Math.sin(i*1.25)*.85);parts.push(tower)}
  const scan=mesh(new T.ConeGeometry(1.15,.025,64,1,false,0,Math.PI*.4),glass);scan.position.y=-.36;parts.push(scan);
 }else{
  core=mesh(new T.OctahedronGeometry(.55,1),pale);
  for(let i=0;i<3;i++){const orbit=ring(.95+i*.35,.025,i%2?metal:glow);orbit.rotation.set(.7+i*.5,i*.4,.4);parts.push(orbit);const curve=new T.EllipseCurve(0,0,.95+i*.35,.95+i*.35,0,Math.PI*2,false,0);for(let k=0;k<3;k++){const dot=mesh(new T.SphereGeometry(.065,12,12),glow);packets.push({dot,orbit:i+k*2})}}
 }
 const dots=new Float32Array(180*3);for(let i=0;i<180;i++){const a=i*2.39996,z=(i/180-.5)*4,rad=Math.sqrt(4-z*z)*1.6;dots[i*3]=Math.cos(a)*rad;dots[i*3+1]=z;dots[i*3+2]=Math.sin(a)*rad-1.5}const geo=new T.BufferGeometry();geo.setAttribute('position',new T.BufferAttribute(dots,3));const stars=new T.Points(geo,new T.PointsMaterial({color:mint,size:.025,transparent:true,opacity:.5}));g.add(stars);
 const resize=()=>{const b=host.getBoundingClientRect();if(b.width&&b.height){r.setSize(b.width,b.height,false);camera.aspect=b.width/b.height;camera.position.z=camera.aspect<.75?12:8;camera.updateProjectionMatrix()}};new ResizeObserver(resize).observe(host);resize();
 const item={r,scene,camera,g,core,parts,packets,stars,host,kind,index,visible:false};new IntersectionObserver(es=>item.visible=es[0].isIntersecting,{rootMargin:'200px'}).observe(host);scenes.push(item);window.__cinematic.ready++;r.render(scene,camera);
 }catch(e){window.__cinematic.errors.push(e.message)}
}
const engine=document.querySelector('.engine-core');build(engine,'engine',0);
document.querySelectorAll('.control-grid .visual').forEach((h,i)=>build(h,['software','account','execution'][i],i));
document.querySelectorAll('.pipeline-art').forEach((h,i)=>build(h,['intake','rules','connection','operations'][i],i));
document.querySelectorAll('.risk-art').forEach((h,i)=>build(h,['account','rules','operations','software'][i],10+i));
const hero=document.createElement('div');hero.className='hero-webgl';document.querySelector('.film-stage').append(hero);build(hero,'engine',8);
let pointer={x:0,y:0};document.addEventListener('pointermove',e=>{pointer.x=(e.clientX/innerWidth-.5);pointer.y=(e.clientY/innerHeight-.5)});
function frame(t){const s=t*.001;for(const o of scenes){if(!o.visible&&!reduce)continue;const speed=reduce?0:s;o.g.rotation.y=Math.sin(speed*.23+o.index)*.15+pointer.x*.12;o.g.rotation.x=.08+pointer.y*.04;o.core.rotation.y=o.kind==='account'?-.25+Math.sin(speed*.5)*.3:o.kind==='connection'?.5+Math.sin(speed*.5)*.2:speed*.22;o.stars.rotation.y=speed*.04;o.parts.forEach((p,i)=>{if(o.kind==='software'||o.kind==='rules'){p.position.y=(i-2)*.29+Math.sin(speed+i*.5)*.06;if(i>=5)p.rotation.z=speed*.3}else if(o.kind==='account')p.rotation.y=Math.sin(speed*.4)*.2;else if(o.kind==='operations')p.rotation.y=speed*.5;else p.rotation.z+=reduce?0:.0015*(i%2?-1:1)});o.packets.forEach((p,i)=>{if(p.curve)p.dot.position.copy(p.curve.getPoint((speed*.2+p.offset)%1));else if(p.stream!==undefined){const v=(speed*.22+p.stream)%1,angle=i*2.39996;p.dot.position.set(Math.cos(angle)*(1-v)*1.2,1.65-v*2.6,Math.sin(angle)*(1-v)*1.2)}else if(p.link!==undefined){p.dot.position.set(-1.5+((speed*.2+p.link)%1)*3,.12,Math.sin((speed*.2+p.link)*6.28)*.15)}else{const a=speed*.7+p.orbit;p.dot.position.set(Math.cos(a)*1.5,Math.sin(a*.8)*.75,Math.sin(a)*1.5)}});if(o.kind==='engine'){const input=window.__activeInput||'macro';o.core.scale.setScalar(1+Math.sin(speed*1.4)*.04);o.g.rotation.z=input==='risk'?.12:input==='rates'?-.12:0}o.r.render(o.scene,o.camera);window.__cinematic.frames++;}window.__webglRendered=window.__cinematic.frames>0;if(!reduce)requestAnimationFrame(frame)}requestAnimationFrame(frame);
