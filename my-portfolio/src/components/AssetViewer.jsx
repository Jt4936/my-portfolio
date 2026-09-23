import { Component, Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Bounds,
  Center,
  Clone,
  ContactShadows,
  Html,
  OrbitControls,
  useGLTF,
} from '@react-three/drei'

class ModelErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error) {
    console.error('Unable to render model preview:', error)
  }

  render() {
    if (this.state.error) {
      return (
        <Html center>
          <div className="asset-viewer-state asset-viewer-error" role="alert">
            {this.props.message}
          </div>
        </Html>
      )
    }
    return this.props.children
  }
}

function LoadingState({ message }) {
  return (
    <Html center>
      <div className="asset-viewer-state" role="status" aria-live="polite">
        <span className="asset-viewer-spinner" aria-hidden="true" />
        {message}
      </div>
    </Html>
  )
}

function PreviewModel({ asset }) {
  const { scene } = useGLTF(asset.model)
  const viewer = asset.viewer ?? {}

  return (
    <group
      scale={viewer.scale ?? 1}
      position={viewer.position ?? [0, 0, 0]}
      rotation={viewer.rotation ?? [0, 0, 0]}
    >
      <Clone object={scene} />
    </group>
  )
}

function CameraControls({ autoRotate, command }) {
  const controlsRef = useRef(null)
  const { camera, invalidate } = useThree()

  useEffect(() => {
    const controls = controlsRef.current
    if (!controls || !command.type) return

    const offset = camera.position.clone().sub(controls.target)
    const distance = offset.length()
    if (!distance) return

    const multiplier = command.type === 'zoomIn' ? 0.8 : 1.25
    const nextDistance = Math.min(40, Math.max(0.35, distance * multiplier))
    camera.position.copy(controls.target).add(offset.normalize().multiplyScalar(nextDistance))
    camera.updateProjectionMatrix()
    controls.update()
    invalidate()
  }, [camera, command, invalidate])

  useEffect(() => {
    invalidate()
  }, [autoRotate, invalidate])

  useFrame(() => {
    if (!autoRotate || !controlsRef.current) return
    controlsRef.current.update()
    invalidate()
  }, -1)

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enableDamping
      dampingFactor={0.08}
      enablePan={false}
      minDistance={0.35}
      maxDistance={40}
      autoRotate={autoRotate}
      autoRotateSpeed={1.15}
    />
  )
}

function ViewerScene({ asset, autoRotate, command, labels }) {
  return (
    <>
      <ambientLight intensity={1.25} />
      <directionalLight position={[4, 7, 5]} intensity={2.4} />
      <directionalLight position={[-5, 2, -4]} intensity={1.1} color="#9bbcff" />

      <ModelErrorBoundary message={labels.error}>
        <Suspense fallback={<LoadingState message={labels.loading} />}>
          <Bounds fit clip observe margin={1.25}>
            <Center bottom>
              <PreviewModel asset={asset} />
            </Center>
          </Bounds>
          <ContactShadows
            position={[0, -0.015, 0]}
            opacity={0.34}
            scale={14}
            blur={2.8}
            far={8}
            frames={1}
          />
        </Suspense>
      </ModelErrorBoundary>

      <CameraControls autoRotate={autoRotate} command={command} />
    </>
  )
}

export default function AssetViewer({ asset, labels }) {
  const [autoRotate, setAutoRotate] = useState(false)
  const [resetVersion, setResetVersion] = useState(0)
  const [command, setCommand] = useState({ id: 0, type: null })

  if (!asset?.model) {
    return (
      <div className="asset-viewer asset-viewer-empty" role="status">
        <span className="asset-viewer-empty-mark" aria-hidden="true">3D</span>
        <p>{labels.unavailable}</p>
      </div>
    )
  }

  const issueCommand = (type) => {
    setCommand((current) => ({ id: current.id + 1, type }))
  }

  return (
    <section className="asset-viewer" aria-label={`${labels.preview}: ${asset.title?.zh ?? asset.id}`}>
      <Canvas
        key={`${asset.id}-${resetVersion}`}
        frameloop="demand"
        dpr={[1, 1.5]}
        camera={{ position: [3.8, 2.4, 5.2], fov: 38, near: 0.01, far: 1000 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ViewerScene
          asset={asset}
          autoRotate={autoRotate}
          command={command}
          labels={labels}
        />
      </Canvas>

      <div className="asset-viewer-hint" aria-hidden="true">{labels.hint}</div>
      <div className="asset-viewer-controls" aria-label={labels.controls}>
        <button type="button" onClick={() => issueCommand('zoomIn')} aria-label={labels.zoomIn} title={labels.zoomIn}>
          <span aria-hidden="true">＋</span>
        </button>
        <button type="button" onClick={() => issueCommand('zoomOut')} aria-label={labels.zoomOut} title={labels.zoomOut}>
          <span aria-hidden="true">−</span>
        </button>
        <button
          type="button"
          className={autoRotate ? 'active' : ''}
          onClick={() => setAutoRotate((value) => !value)}
          aria-pressed={autoRotate}
          title={labels.autoRotate}
        >
          <span aria-hidden="true">↻</span>
          <span>{labels.rotate}</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setAutoRotate(false)
            setCommand({ id: 0, type: null })
            setResetVersion((value) => value + 1)
          }}
          title={labels.reset}
        >
          <span aria-hidden="true">◎</span>
          <span>{labels.reset}</span>
        </button>
      </div>
    </section>
  )
}
