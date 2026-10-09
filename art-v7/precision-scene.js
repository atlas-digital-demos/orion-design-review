import * as THREE from './assets/17-three.min.js';
export function createPrecision(canvas,{width=innerWidth,height=innerHeight,film=false}={}){
 const scene=new THREE.Scene();scene.background=film?new THREE.Color('#071216'):null;
 const camera=new THREE.PerspectiveCamera(36,width/height,.1,100);
 const renderer=new THREE.WebGLRenderer({canvas,alpha:!film,antialias:true,preserveDrawingBuffer:film});renderer.setSize(width,height,false);renderer.setPixelRatio(film?1:Math.min(devicePixelRatio,1.5));renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.2;
 const rig=new THREE.Group();scene.add(rig);const layers=[];
 const black=new THREE.MeshStandardMaterial({color:0x172a2e,metalness:.88,roughness:.24});
 const gold=new THREE.MeshStandardMaterial({color:0xcfbb8e,metalness:.85,roughness:.24});
 const edge=new THREE.MeshStandardMaterial({color:0x6d8a85,metalness:.8,roughness:.2});
 const luminous=new THREE.MeshBasicMaterial({color:0xa3eee0});
 const glass=new THREE.MeshPhysicalMaterial({color:0x789e95,metalness:.1,roughness:.12,transmission:.6,thickness:.4,transparent:true,opacity:.55,ior:1.5});
 function mesh(geo,mat,group,x=0,y=0,z=0){const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);group.add(m);return m}
 function box(w,h,d,mat,g,x=0,y=0,z=0){return mesh(new THREE.BoxGeometry(w,h,d),mat,g,x,y,z)}
 for(let n=0;n<5;n++){
 const g=new THREE.Group();rig.add(g);layers.push(g);let s=2.55-n*.16;
 box(s,.10,.14,gold,g,0,s/2);box(s,.10,.14,gold,g,0,-s/2);box(.10,s,.14,black,g,-s/2);box(.10,s,.14,black,g,s/2);
 for(let k=0;k<40;k++){let x=(k/39-.5)*s;box(.012,k%5===0?.16:.07,.025,edge,g,x,s/2-.16,.1);box(.012,k%5===0?.16:.07,.025,edge,g,x,-s/2+.16,.1)}
 for(const x of[-s/2,s/2])for(const y of[-s/2,s/2]){const screw=mesh(new THREE.CylinderGeometry(.055,.055,.04,12),gold,g,x,y,.105);screw.rotation.x=Math.PI/2;box(.006,.04,.008,black,g,x,y,.13)}
 box(s-.25,s-.25,.035,n===2?glass:black,g,0,0,-.07);
 if(n!==2){for(let k=0;k<21;k++){let y=(k/20-.5)*(s-.6);box(s-.6,.012,.02,edge,g,0,y,.025);for(let j=0;j<5;j++){box(.07,.07,.015,k%3===0?gold:edge,g,(j/4-.5)*(s-.7),y,.05)}}}
 else{for(let j=0;j<6;j++){let x=(j/5-.5)*1.6;box(.05,1.8,.06,gold,g,x,0,.07)}box(.6,.6,.24,gold,g);box(.43,.43,.255,black,g);box(.25,.25,.265,luminous,g)}
 }
 const paths=new THREE.Group();rig.add(paths);for(let i=0;i<15;i++){const y=(i/14-.5)*2;const points=[];for(let k=0;k<50;k++){const x=(k/49-.5)*8;points.push(new THREE.Vector3(x,y+Math.sin(k*.18+i)*.06,Math.sin(i)*.15))}const curve=new THREE.CatmullRomCurve3(points);mesh(new THREE.TubeGeometry(curve,50,.005,3,false),i%3===0?gold:luminous,paths)}
 const sparks=[];for(let i=0;i<70;i++){const m=mesh(new THREE.SphereGeometry(i%6===0?.021:.01,6,4),i%3===0?gold:luminous,rig);sparks.push(m)}
 const backdrop=new THREE.GridHelper(60,100,0x1b3e3d,0x102628);backdrop.position.y=-2.15;scene.add(backdrop);
 scene.add(new THREE.HemisphereLight(0xaaccc8,0x111a1d,2.8));const key=new THREE.DirectionalLight(0xffebc8,8);key.position.set(3,5,5);scene.add(key);const fill=new THREE.DirectionalLight(0x57bdb6,5);fill.position.set(-3,2,1);scene.add(fill);const rim=new THREE.DirectionalLight(0xbee4df,7);rim.position.set(2,4,-4);scene.add(rim);
 let frames=0;function draw(t=0,scroll=0){const portrait=width<height;const phase=(Math.sin(t*Math.PI/7-Math.PI/2)+1)/2;const explode=.45+phase*.45+scroll*.9;
 layers.forEach((g,i)=>{g.position.z=(i-2)*explode;g.position.y=Math.sin(t*.3+i*.5)*.055;g.rotation.z=(i-2)*scroll*.012});
 rig.rotation.y=-.45+Math.sin(t*Math.PI/14)*.2+scroll*.55;rig.rotation.x=.06+scroll*.12;rig.rotation.z=-.045;
 rig.position.x=film?(portrait?0:.95):(portrait?0:1.25);
 paths.scale.x=1+scroll*.2;paths.visible=!portrait;paths.rotation.y=scroll*.1;
 sparks.forEach((m,i)=>{m.position.set(((t*.38+i*.137)%1-.5)*7,(i%14/13-.5)*2.3,Math.sin(i)*(.4+explode));});
 const dist=portrait?9.3:8.1;camera.position.set(4.1+phase*.65,2.1+phase*.4,dist-phase*.6);camera.lookAt(portrait?0:.45,0,0);renderer.render(scene,camera);frames++;}
 function resize(w,h){width=w;height=h;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()}
 return{draw,resize,get frames(){return frames},context:!!renderer.getContext()};
}
