import * as THREE from './assets/13-three.min.js';
export function createPrecision(canvas,{width=innerWidth,height=innerHeight,film=false,chapter=false}={}){
 const scene=new THREE.Scene();scene.background=film?new THREE.Color('#061321'):null;
 const camera=new THREE.PerspectiveCamera(34,width/height,.1,100);
 const renderer=new THREE.WebGLRenderer({canvas,alpha:!film,antialias:true,preserveDrawingBuffer:film});renderer.setSize(width,height,false);renderer.setPixelRatio(film?1:Math.min(devicePixelRatio,2));renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.25;
 const rig=new THREE.Group();scene.add(rig);const layers=[];
 const ceramic=new THREE.MeshStandardMaterial({color:0xe6edf3,metalness:.18,roughness:.3});
 const blue=new THREE.MeshStandardMaterial({color:0x527dae,metalness:.42,roughness:.24});
 const dark=new THREE.MeshStandardMaterial({color:0x10253f,metalness:.25,roughness:.3});
 const light=new THREE.MeshBasicMaterial({color:0x9ecaff});
 const glass=new THREE.MeshPhysicalMaterial({color:0x97bce1,metalness:.15,roughness:.15,transparent:true,opacity:.12,side:THREE.DoubleSide});
 const trace=new THREE.LineBasicMaterial({color:0x7fa7cc,transparent:true,opacity:.8});
 function box(w,h,d,mat,g,x=0,y=0,z=0){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.position.set(x,y,z);g.add(m);return m}
 function line(points,g,mat=trace){const m=new THREE.Line(new THREE.BufferGeometry().setFromPoints(points.map(p=>new THREE.Vector3(...p))),mat);g.add(m);return m}
 for(let n=0;n<5;n++){
  const g=new THREE.Group();rig.add(g);layers.push(g);const s=2.3;
  box(s,s,.025,glass,g);const edge=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(s,s,.025)),trace);g.add(edge);
  for(const x of[-s/2,s/2])for(const y of[-s/2,s/2]){box(.14,.014,.025,ceramic,g,x,y,.025);box(.014,.14,.025,ceramic,g,x,y,.025)}
  for(let k=0;k<24;k++){const y=(k/23-.5)*1.96;box(.06,k%4===0?.016:.007,.008,ceramic,g,-1.07,y,.036)}
  if(n===0||n===4){for(let k=0;k<7;k++){const y=(k/6-.5)*1.5;line([[-.87,y,.04],[-.3,y,.04],[.12,y+.12,.04],[.8,y+.12,.04]],g)}for(let j=0;j<5;j++)box(.13,.018,.02,blue,g,.68,(j/4-.5)*1.45,.04)}
  if(n===1||n===3){for(let j=0;j<5;j++)for(let k=0;k<5;k++){const x=(j/4-.5)*1.55,y=(k/4-.5)*1.55;box(.19,.19,.02,(j+k)%3?blue:ceramic,g,x,y,.035)}}
  if(n===2){box(.82,.82,.16,ceramic,g);box(.64,.64,.19,dark,g);box(.38,.38,.205,light,g);for(let j=0;j<9;j++){const x=(j/8-.5)*.9;box(.012,.22,.025,ceramic,g,x,.56,.04);box(.012,.22,.025,ceramic,g,x,-.56,.04);box(.22,.012,.025,ceramic,g,.56,x,.04);box(.22,.012,.025,ceramic,g,-.56,x,.04)}for(let k=0;k<4;k++){const s2=1.16+k*.21;line([[-s2/2,-s2/2,.02],[s2/2,-s2/2,.02],[s2/2,s2/2,.02],[-s2/2,s2/2,.02],[-s2/2,-s2/2,.02]],g)}}
 }
 const pathways=new THREE.Group();rig.add(pathways);for(let i=0;i<9;i++){const y=(i/8-.5)*1.6;line([[-5,y,0],[-2.2,y,0],[-1.35,y*.9,.3],[1.35,y*.9,.3],[2.2,y,0],[5,y,0]],pathways)}
 const sparks=[];for(let i=0;i<24;i++){const m=box(.07,.012,.012,light,rig);sparks.push(m)}
 const halo=new THREE.Mesh(new THREE.PlaneGeometry(4.5,4.5),new THREE.MeshBasicMaterial({color:0x173c63,transparent:true,opacity:.14,side:THREE.DoubleSide}));halo.position.z=-2.5;halo.visible=false;rig.add(halo);
 scene.add(new THREE.HemisphereLight(0xeaf4ff,0x365471,4));for(const[c,intensity,x,y,z]of[[0xf3f6ff,7,3,4,5],[0x6daaff,6,-4,1,2],[0xc5ddff,7,2,3,-5]]){const l=new THREE.DirectionalLight(c,intensity);l.position.set(x,y,z);scene.add(l)}
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
