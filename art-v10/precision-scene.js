import * as THREE from './assets/13-three.min.js';
export function createPrecision(canvas,{width=innerWidth,height=innerHeight,film=false,chapter=false}={}){
 const scene=new THREE.Scene();scene.background=film?new THREE.Color('#061321'):null;
 const camera=new THREE.PerspectiveCamera(34,width/height,.1,100);
 const renderer=new THREE.WebGLRenderer({canvas,alpha:!film,antialias:true,preserveDrawingBuffer:film});renderer.setSize(width,height,false);renderer.setPixelRatio(film?1:Math.min(devicePixelRatio,2));renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;
 const room=[];for(let i=0;i<6;i++){const c=document.createElement('canvas');c.width=c.height=256;const ctx=c.getContext('2d');ctx.fillStyle='#122131';ctx.fillRect(0,0,256,256);const g=ctx.createLinearGradient(0,0,256,256);g.addColorStop(0,'#aebcc7');g.addColorStop(.18,'#233549');g.addColorStop(.45,'#0b1724');g.addColorStop(.55,'#6d7d8c');g.addColorStop(.65,'#172939');g.addColorStop(1,'#060e16');ctx.fillStyle=g;ctx.fillRect(0,0,256,256);ctx.fillStyle=i%2?'#8395a5':'#e3e9ef';ctx.fillRect(20,18,20,195);room.push(c)}const cube=new THREE.CubeTexture(room);cube.needsUpdate=true;scene.environment=new THREE.PMREMGenerator(renderer).fromCubemap(cube).texture;
 const rig=new THREE.Group();scene.add(rig);const layers=[];
 const ceramic=new THREE.MeshStandardMaterial({color:0xc4cad0,metalness:.58,roughness:.23});
 const blue=new THREE.MeshStandardMaterial({color:0x3a5b75,metalness:.58,roughness:.19});
 const dark=new THREE.MeshStandardMaterial({color:0x081420,metalness:.75,roughness:.22});
 const light=new THREE.MeshBasicMaterial({color:0xc49a64});
 const glass=new THREE.MeshPhysicalMaterial({color:0x172c40,metalness:.45,roughness:.11,transparent:true,opacity:.035,side:THREE.DoubleSide});
 const copper=new THREE.MeshStandardMaterial({color:0xb78a54,metalness:.88,roughness:.24});
 const trace=new THREE.LineBasicMaterial({color:0x718497,transparent:true,opacity:.55});
 function box(w,h,d,mat,g,x=0,y=0,z=0){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.position.set(x,y,z);g.add(m);return m}
 function line(points,g,mat=trace){const m=new THREE.Line(new THREE.BufferGeometry().setFromPoints(points.map(p=>new THREE.Vector3(...p))),mat);g.add(m);return m}
 for(let n=0;n<5;n++){
  const g=new THREE.Group();rig.add(g);layers.push(g);const s=2.3;
  const outline=new THREE.Shape();outline.moveTo(-s/2,-s/2);outline.lineTo(s/2,-s/2);outline.lineTo(s/2,s/2);outline.lineTo(-s/2,s/2);outline.closePath();const hole=new THREE.Path();hole.moveTo(-1.055,-1.055);hole.lineTo(-1.055,1.055);hole.lineTo(1.055,1.055);hole.lineTo(1.055,-1.055);hole.closePath();outline.holes.push(hole);const frame=new THREE.Mesh(new THREE.ExtrudeGeometry(outline,{depth:.045,bevelEnabled:true,bevelSize:.018,bevelThickness:.012,bevelSegments:2,steps:1}),n%2?blue:dark);g.add(frame);box(s,s,.008,glass,g);const edge=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(s,s,.025)),trace);g.add(edge);
  for(const x of[-s/2,s/2])for(const y of[-s/2,s/2]){box(.14,.014,.025,ceramic,g,x,y,.025);box(.014,.14,.025,ceramic,g,x,y,.025)}
  for(let k=0;k<24;k++){const y=(k/23-.5)*1.96;box(.06,k%4===0?.016:.007,.008,ceramic,g,-1.07,y,.036)}
  for(let j=0;j<4;j++){const x=(j%2?1:-1)*1.025,y=(j<2?1:-1)*1.025;const bolt=new THREE.Mesh(new THREE.CylinderGeometry(.032,.032,.03,12),copper);bolt.rotation.x=Math.PI/2;bolt.position.set(x,y,.05);g.add(bolt)}
  for(let j=0;j<11;j++){const y=(j/10-.5)*1.75;box(.36,.006,.009,copper,g,-.74,y,.055);box(.008,.024,.015,copper,g,-.54,y,.055);if(j%2===0)box(.024,.024,.014,light,g,-.51,y,.055)}
  if(n===0||n===4){for(let k=0;k<7;k++){const y=(k/6-.5)*1.5;line([[-.87,y,.04],[-.3,y,.04],[.12,y+.12,.04],[.8,y+.12,.04]],g)}for(let j=0;j<5;j++)box(.13,.018,.02,blue,g,.68,(j/4-.5)*1.45,.04)}
  if(n===1||n===3){for(let j=0;j<5;j++)for(let k=0;k<5;k++){const x=(j/4-.5)*1.55,y=(k/4-.5)*1.55;box(.19,.19,.045,(j+k)%3?blue:ceramic,g,x,y,.035);for(let a=0;a<3;a++){box(.02,.012,.02,copper,g,x-.07+a*.07,y+.11,.05);box(.02,.012,.02,copper,g,x-.07+a*.07,y-.11,.05)}}}
  if(n===2){box(.82,.82,.16,ceramic,g);for(let k=0;k<14;k++)box(.67,.011,.06,ceramic,g,0,(k/13-.5)*.69,.115);box(.64,.64,.19,dark,g);box(.38,.38,.205,light,g);for(let j=0;j<9;j++){const x=(j/8-.5)*.9;box(.012,.22,.025,ceramic,g,x,.56,.04);box(.012,.22,.025,ceramic,g,x,-.56,.04);box(.22,.012,.025,ceramic,g,.56,x,.04);box(.22,.012,.025,ceramic,g,-.56,x,.04)}for(let k=0;k<4;k++){const s2=1.16+k*.21;line([[-s2/2,-s2/2,.02],[s2/2,-s2/2,.02],[s2/2,s2/2,.02],[-s2/2,s2/2,.02],[-s2/2,-s2/2,.02]],g)}}
 }
 const pathways=new THREE.Group();rig.add(pathways);for(let i=0;i<9;i++){const y=(i/8-.5)*1.6;line([[-5,y,0],[-2.2,y,0],[-1.35,y*.9,.3],[1.35,y*.9,.3],[2.2,y,0],[5,y,0]],pathways)}
 const sparks=[];for(let i=0;i<24;i++){const m=box(.07,.012,.012,light,rig);sparks.push(m)}
 const halo=new THREE.Mesh(new THREE.PlaneGeometry(4.5,4.5),new THREE.MeshBasicMaterial({color:0x173c63,transparent:true,opacity:.14,side:THREE.DoubleSide}));halo.position.z=-2.5;halo.visible=false;rig.add(halo);
 scene.add(new THREE.HemisphereLight(0xeaf4ff,0x152536,1.1));for(const[c,intensity,x,y,z]of[[0xf3f6ff,5,3,4,5],[0x6daaff,3,-4,1,2],[0xc5ddff,5,2,3,-5]]){const l=new THREE.DirectionalLight(c,intensity);l.position.set(x,y,z);scene.add(l)}
 let frames=0;
 function draw(t=0,scroll=0){const portrait=width<height,phase=(Math.sin(t*Math.PI/6-Math.PI/2)+1)/2,explode=.28+phase*.4+scroll*.3;
  layers.forEach((g,i)=>{g.position.z=(i-2)*explode;g.rotation.z=(i-2)*.008*Math.sin(t*.4)});
  rig.rotation.y=-.48+Math.sin(t*Math.PI/12)*.24+scroll*.15;rig.rotation.x=.12+Math.sin(t*.4)*.03;rig.rotation.z=-.11;
  rig.position.x=chapter?0:portrait?0:1.5;rig.position.y=film&&portrait?1.6:chapter?0:portrait?-.25:0;
  pathways.visible=!portrait;sparks.forEach((m,i)=>{m.position.set(((t*.2+i/24)%1-.5)*9,(i%9/8-.5)*1.6,(i%3-1)*.3)});
  const dist=film&&portrait?13.5:chapter?6.9:portrait?9.8:7.9;camera.position.set(2.7,1.5,dist);camera.lookAt(chapter?0:portrait?0:.35,0,0);renderer.render(scene,camera);frames++;
 }
 function resize(w,h){width=w;height=h;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()}
 return{draw,resize,get frames(){return frames},context:!!renderer.getContext()};
    }
