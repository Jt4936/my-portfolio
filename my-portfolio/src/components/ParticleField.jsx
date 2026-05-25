import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import * as THREE from 'three'

function makeRoundSprite(size = 64) {
  const cv = document.createElement('canvas')
  cv.width = cv.height = size
  const ctx = cv.getContext('2d')
  const g = ctx.createRadialGradient(size/2,size/2,0,size/2,size/2,size/2)
  g.addColorStop(0,   'rgba(255,255,255,1)')
  g.addColorStop(0.4, 'rgba(255,255,255,0.8)')
  g.addColorStop(0.7, 'rgba(255,255,255,0.3)')
  g.addColorStop(1,   'rgba(255,255,255,0)')
  ctx.fillStyle = g; ctx.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(cv)
}
const roundTex = makeRoundSprite(64)

// Camera waypoints per page
const WAYPOINTS = [
  { z: 800, y:   0, x:   0, fov: 60 }, // 0 Hero     — deep space
  { z: 320, y: -10, x:  15, fov: 65 }, // 1 About    — galaxy approach
  { z: 130, y:   8, x:  -8, fov: 62 }, // 2 Work     — solar system
  { z:  48, y:  22, x: -14, fov: 68 }, // 3 Skills   — earth orbit
  { z:  -4, y:  -1, x:   0, fov: 60 }, // 4 Contact  — through earth (hidden by photo)
]

const ParticleField = forwardRef(function ParticleField(_, ref) {
  const mountRef   = useRef(null)
  const cameraRef  = useRef(null)
  const nebulaRef  = useRef(null)
  const solarRef   = useRef(null)
  const earthRef   = useRef(null)
  const cloudRef   = useRef(null)
  const nebulaDefsRef = useRef([])
  const g1Ref      = useRef(null)
  const g2Ref      = useRef(null)

  // Active flight state
  const flightRef  = useRef(null) // { from, to, startTime, duration, flashColor }

  useImperativeHandle(ref, () => ({
    flyTo(pageIndex, prevIndex) {
      const cam = cameraRef.current
      if (!cam) return
      const from = { z: cam.position.z, y: cam.position.y, x: cam.position.x, fov: cam.fov }
      const to   = WAYPOINTS[pageIndex]

      // Pick flash color by direction
      const flashColors = ['#ffffff','#9966ff','#4488ff','#44ddff','#ffffff']
      const flash = flashColors[pageIndex] ?? '#ffffff'

      flightRef.current = {
        from, to,
        startTime: performance.now(),
        duration: pageIndex === 4 ? 850 : 950,
        flashColor: flash,
        toPage: pageIndex,
      }
    }
  }))

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const W = window.innerWidth, H = window.innerHeight
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W, H)
    renderer.setClearColor(0x00000a, 1)
    mount.appendChild(renderer.domElement)

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, W/H, 0.1, 3000)
    camera.position.set(0, 0, 800)
    cameraRef.current = camera

    const rnd    = (a, b) => a + Math.random() * (b - a)
    const rndInt = (a, b) => Math.floor(rnd(a, b))

    // ── STARS ─────────────────────────────────────
    const makeStars = (count, spread, size, colors, zSpread = 1800) => {
      const geo = new THREE.BufferGeometry()
      const pos = new Float32Array(count * 3)
      const col = new Float32Array(count * 3)
      const cols = colors.map(c => new THREE.Color(c))
      for (let i = 0; i < count; i++) {
        pos[i*3]   = rnd(-spread, spread)
        pos[i*3+1] = rnd(-spread*.7, spread*.7)
        pos[i*3+2] = rnd(-zSpread/2, zSpread/2)
        const c = cols[rndInt(0, cols.length)]
        col[i*3]=c.r; col[i*3+1]=c.g; col[i*3+2]=c.b
      }
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      geo.setAttribute('color',    new THREE.BufferAttribute(col, 3))
      return new THREE.Points(geo, new THREE.PointsMaterial({
        size, map: roundTex, vertexColors: true,
        transparent: true, opacity: 0.85, alphaTest: 0.01,
        sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false,
      }))
    }
    scene.add(makeStars(6000,1400,1.2,['#ffffff','#cce0ff','#ffe8cc','#e0f0ff'],2000))
    scene.add(makeStars(2000,1000,2.2,['#ffffff','#fff5e0','#ffd6aa','#c8e8ff'],1600))
    scene.add(makeStars( 500, 700,3.5,['#ffffff','#fffbe0','#ffd080','#80c8ff'],1200))
    scene.add(makeStars( 100, 400,5.5,['#ffffff','#ffe8aa'], 800))

    // ── NEBULAS ───────────────────────────────────
    const makeNebulaTex = (c1, c2) => {
      const cv = document.createElement('canvas'); cv.width = cv.height = 256
      const ctx = cv.getContext('2d')
      const g = ctx.createRadialGradient(128,128,0,128,128,128)
      g.addColorStop(0, c1+'ee'); g.addColorStop(.3, c1+'55')
      g.addColorStop(.7, c2+'22'); g.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle=g; ctx.fillRect(0,0,256,256)
      const g2 = ctx.createRadialGradient(128,128,0,128,128,48)
      g2.addColorStop(0,c1+'ff'); g2.addColorStop(1,'rgba(0,0,0,0)')
      ctx.fillStyle=g2; ctx.fillRect(0,0,256,256)
      return new THREE.CanvasTexture(cv)
    }
    const nebulaDefs = [
      [  20, 10,-220,680,440,'#3a0a6e','#6a1a9e',.52],
      [-260,110,-340,540,340,'#0a2a6e','#1a4aae',.44],
      [ 300,-90,-280,580,360,'#6e0a2a','#ae2a5a',.36],
      [-160,-200,-300,460,280,'#0a4a3a','#1a8a6a',.33],
      [ 480,240,-480,760,480,'#2a0a5e','#5a1aae',.28],
      [-460,-130,-420,620,380,'#5e2a00','#ae5a10',.26],
      [ 140,-300,-260,500,320,'#003a5e','#0a6aae',.38],
      [ 230,170,-180,400,260,'#3e0a5e','#7e2aae',.44],
    ]
    nebulaDefsRef.current = nebulaDefs
    const nebulaGroup = new THREE.Group()
    nebulaDefs.forEach(([x,y,z,sx,sy,c1,c2,op]) => {
      const s = new THREE.Sprite(new THREE.SpriteMaterial({
        map: makeNebulaTex(c1,c2), transparent:true, opacity:op,
        blending:THREE.AdditiveBlending, depthWrite:false,
      }))
      s.position.set(x,y,z); s.scale.set(sx,sy,1)
      s.userData.baseOpacity = op
      nebulaGroup.add(s)
    })
    scene.add(nebulaGroup)
    nebulaRef.current = nebulaGroup

    // ── GALAXIES ──────────────────────────────────
    const makeGalaxy = (cx,cy,cz,count,radius,arms,twist) => {
      const geo = new THREE.BufferGeometry()
      const pos = new Float32Array(count*3), col = new Float32Array(count*3)
      const inside = new THREE.Color('#ffd080'), outside = new THREE.Color('#5080ff')
      for (let i=0;i<count;i++) {
        const r=Math.pow(Math.random(),1.3)*radius
        const spin=r*twist, branch=((i%arms)/arms)*Math.PI*2
        const sc=Math.pow(Math.random(),3)*(Math.random()<.5?1:-1)*radius*.07
        pos[i*3]  =cx+Math.cos(branch+spin)*r+sc
        pos[i*3+1]=cy+sc*.2
        pos[i*3+2]=cz+Math.sin(branch+spin)*r+sc
        const m=new THREE.Color().lerpColors(inside,outside,r/radius)
        col[i*3]=m.r; col[i*3+1]=m.g; col[i*3+2]=m.b
      }
      geo.setAttribute('position',new THREE.BufferAttribute(pos,3))
      geo.setAttribute('color',new THREE.BufferAttribute(col,3))
      return new THREE.Points(geo,new THREE.PointsMaterial({
        size:1.8,map:roundTex,vertexColors:true,transparent:true,opacity:.75,
        alphaTest:.01,blending:THREE.AdditiveBlending,depthWrite:false,sizeAttenuation:true,
      }))
    }
    const g1=makeGalaxy(10,0,-160,6000,240,3,1.6)
    const g2=makeGalaxy(-380,60,-550,2500,170,2,2.0)
    scene.add(g1); scene.add(g2)
    g1Ref.current=g1; g2Ref.current=g2

    // Clusters
    const makeCluster=(cx,cy,cz,count,spread)=>{
      const geo=new THREE.BufferGeometry()
      const pos=new Float32Array(count*3),col=new Float32Array(count*3)
      for(let i=0;i<count;i++){
        const r=Math.pow(Math.random(),2)*spread
        const t2=Math.random()*Math.PI*2,p2=Math.acos(2*Math.random()-1)
        pos[i*3]  =cx+r*Math.sin(p2)*Math.cos(t2)
        pos[i*3+1]=cy+r*Math.sin(p2)*Math.sin(t2)
        pos[i*3+2]=cz+r*Math.cos(p2)
        const c=new THREE.Color(['#ffffff','#fff8e0','#ffe0a0','#c0d8ff'][rndInt(0,4)])
        col[i*3]=c.r;col[i*3+1]=c.g;col[i*3+2]=c.b
      }
      geo.setAttribute('position',new THREE.BufferAttribute(pos,3))
      geo.setAttribute('color',new THREE.BufferAttribute(col,3))
      return new THREE.Points(geo,new THREE.PointsMaterial({
        size:1.5,map:roundTex,vertexColors:true,transparent:true,opacity:.88,
        alphaTest:.01,blending:THREE.AdditiveBlending,depthWrite:false,
      }))
    }
    scene.add(makeCluster(-260,140,-110,700,52))
    scene.add(makeCluster( 360,-70,-190,500,42))
    scene.add(makeCluster(  70,260,-280,600,60))

    // ── SOLAR SYSTEM ──────────────────────────────
    const solarGroup = new THREE.Group()
    solarRef.current = solarGroup
    const sunTex=(()=>{
      const cv=document.createElement('canvas');cv.width=cv.height=128
      const ctx=cv.getContext('2d')
      const g=ctx.createRadialGradient(64,64,0,64,64,64)
      g.addColorStop(0,'rgba(255,230,80,1)')
      g.addColorStop(.2,'rgba(255,180,40,0.35)')
      g.addColorStop(.5,'rgba(255,100,0,0.08)')
      g.addColorStop(1,'rgba(0,0,0,0)')
      ctx.fillStyle=g;ctx.fillRect(0,0,128,128)
      return new THREE.CanvasTexture(cv)
    })()
    const sun=new THREE.Sprite(new THREE.SpriteMaterial({map:sunTex,transparent:true,opacity:0,blending:THREE.AdditiveBlending}))
    sun.scale.set(80,80,1);sun.userData.baseOp=0.3
    solarGroup.add(sun)
    const pDefs=[
      {r:28,size:1.8,color:'#aaaaaa'},{r:42,size:2.8,color:'#e8c080'},
      {r:58,size:3.2,color:'#3366cc'},{r:76,size:2.4,color:'#cc5533'},
      {r:118,size:8.0,color:'#ddaa88'},{r:158,size:6.5,color:'#ddcc99',rings:true},
    ]
    pDefs.forEach((pd,idx)=>{
      const oMat=new THREE.MeshBasicMaterial({color:0x223344,side:THREE.DoubleSide,transparent:true,opacity:0})
      oMat.userData={baseOp:.45}
      const orbit=new THREE.Mesh(new THREE.RingGeometry(pd.r-.3,pd.r+.3,80),oMat)
      orbit.rotation.x=Math.PI/2;orbit.userData.baseOp=.45
      solarGroup.add(orbit)
      const pMat=new THREE.MeshBasicMaterial({color:new THREE.Color(pd.color),transparent:true,opacity:0})
      const planet=new THREE.Mesh(new THREE.SphereGeometry(pd.size,20,20),pMat)
      const angle=(idx/pDefs.length)*Math.PI*2
      planet.position.set(Math.cos(angle)*pd.r,0,Math.sin(angle)*pd.r)
      planet.userData={orbitRadius:pd.r,orbitSpeed:.0008/Math.sqrt(pd.r*.08),orbitAngle:angle,baseOp:1}
      if(pd.rings){
        const rMat=new THREE.MeshBasicMaterial({color:0xddcc99,side:THREE.DoubleSide,transparent:true,opacity:0})
        const ring=new THREE.Mesh(new THREE.RingGeometry(pd.size*1.5,pd.size*2.4,48),rMat)
        ring.rotation.x=Math.PI*.38;ring.userData.baseOp=.6
        planet.add(ring)
      }
      solarGroup.add(planet)
    })
    scene.add(solarGroup)

    // ── EARTH ─────────────────────────────────────
    const loader=new THREE.TextureLoader()
    const earthMesh=new THREE.Mesh(
      new THREE.SphereGeometry(30,64,64),
      new THREE.MeshBasicMaterial({transparent:true,opacity:0})
    )
    loader.load('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
      tex=>{earthMesh.material.map=tex;earthMesh.material.needsUpdate=true},
      undefined,
      ()=>{earthMesh.material.color=new THREE.Color(0x1a5faa)}
    )
    const cloudMesh=new THREE.Mesh(
      new THREE.SphereGeometry(30.7,48,48),
      new THREE.MeshBasicMaterial({transparent:true,opacity:0,alphaTest:.05})
    )
    cloudMesh.userData={baseOp:.55}
    loader.load('https://unpkg.com/three-globe/example/img/earth-clouds.png',
      tex=>{cloudMesh.material.map=tex;cloudMesh.material.needsUpdate=true}
    )
    earthMesh.add(cloudMesh)
    cloudRef.current=cloudMesh
    const atmTex=(()=>{
      const cv=document.createElement('canvas');cv.width=cv.height=128
      const ctx=cv.getContext('2d')
      const g=ctx.createRadialGradient(64,64,54,64,64,64)
      g.addColorStop(0,'rgba(80,150,255,0.55)');g.addColorStop(1,'rgba(0,80,255,0)')
      ctx.fillStyle=g;ctx.fillRect(0,0,128,128)
      return new THREE.CanvasTexture(cv)
    })()
    const atm=new THREE.Sprite(new THREE.SpriteMaterial({map:atmTex,transparent:true,opacity:0,blending:THREE.AdditiveBlending}))
    atm.scale.set(90,90,1);atm.userData={baseOp:.85}
    earthMesh.add(atm)
    scene.add(earthMesh)
    earthRef.current=earthMesh

    // ── MOUSE ─────────────────────────────────────
    let mouse={x:0,y:0}
    const onMouseMove=e=>{mouse.x=(e.clientX/window.innerWidth-.5)*2;mouse.y=-(e.clientY/window.innerHeight-.5)*2}
    const onResize=()=>{camera.aspect=window.innerWidth/window.innerHeight;camera.updateProjectionMatrix();renderer.setSize(window.innerWidth,window.innerHeight)}
    window.addEventListener('mousemove',onMouseMove)
    window.addEventListener('resize',onResize)

    // ── ANIMATE ───────────────────────────────────
    let frame=0,animId
    const animate=()=>{
      animId=requestAnimationFrame(animate)
      frame++

      g1.rotation.y+=.00012; g2.rotation.y-=.00008
      earthMesh.rotation.y+=.0008
      if(cloudRef.current) cloudRef.current.rotation.y+=.0003

      solarGroup.children.forEach(ch=>{
        if(ch.userData?.orbitRadius){
          ch.userData.orbitAngle+=ch.userData.orbitSpeed
          ch.position.x=Math.cos(ch.userData.orbitAngle)*ch.userData.orbitRadius
          ch.position.z=Math.sin(ch.userData.orbitAngle)*ch.userData.orbitRadius
        }
      })

      nebulaGroup.children.forEach((s,i2)=>{
        s.material.opacity=s.userData.baseOpacity*(.85+Math.sin(frame*.007+i2)*.15)
      })

      // ── FLIGHT ANIMATION ──────────────────────
      if(flightRef.current){
        const {from,to,startTime,duration,toPage}=flightRef.current
        const elapsed=performance.now()-startTime
        const t=Math.min(elapsed/duration,1)

        // Exponential ease-in-out: slow→fast→slow
        const e = t<.5 ? 4*t*t*t : 1-Math.pow(-2*t+2,3)/2

        camera.position.z=from.z+(to.z-from.z)*e
        camera.position.y=from.y+(to.y-from.y)*e
        camera.position.x=from.x+(to.x-from.x)*e

        // FOV bulge at midpoint for speed feel
        const fovBulge = Math.sin(t*Math.PI)*18
        camera.fov=(from.fov||60)+fovBulge
        camera.updateProjectionMatrix()
        camera.lookAt(0,0,0)

        // Update scene visibility based on camera z
        const p = 1 - Math.max(0,Math.min(1,(camera.position.z-20)/(800-20)))
        const ng=nebulaRef.current
        if(ng) ng.children.forEach((s,i2)=>{
          const base=nebulaDefsRef.current[i2]?.[7]??0.4
          const breath=.85+Math.sin(frame*.007+i2)*.15
          s.material.opacity=base*breath*Math.max(0,1-p*2)
        })
        const sg=solarRef.current
        if(sg){
          const vis=Math.min(1,Math.max(0,(p-.35)*3))
          sg.children.forEach(c=>{
            if(c.material) c.material.opacity=vis*(c.userData.baseOp??1)
            if(c.children) c.children.forEach(cc=>{if(cc.material) cc.material.opacity=vis*(cc.userData.baseOp??1)})
          })
        }
        const eg=earthRef.current
        if(eg){
          const vis=Math.min(1,Math.max(0,(p-.62)*4))
          eg.material.opacity=vis*.95
          eg.children.forEach(c=>{if(c.material) c.material.opacity=vis*(c.userData.baseOp??.5)})
        }

        if(t>=1){
          camera.fov=to.fov||60
          camera.updateProjectionMatrix()
          flightRef.current=null
        }
      } else {
        // Idle — gentle mouse parallax
        camera.position.x+=(mouse.x*10-camera.position.x)*.02
        camera.position.y+=(mouse.y* 7-camera.position.y)*.02
        camera.lookAt(0,0,0)
      }

      renderer.render(scene,camera)
    }
    animate()

    return ()=>{
      window.removeEventListener('mousemove',onMouseMove)
      window.removeEventListener('resize',onResize)
      cancelAnimationFrame(animId)
      renderer.dispose()
      if(mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  },[])

  return <div ref={mountRef} style={{position:'fixed',inset:0,zIndex:0,pointerEvents:'none'}}/>
})

export default ParticleField
