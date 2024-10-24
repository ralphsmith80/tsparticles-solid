import { createSignal, Show } from 'solid-js'
import { Motion } from 'solid-motionone'
import Particles, { initParticlesEngine } from '@tsparticles/solid'
import { loadSlim } from '@tsparticles/slim'
import { cn } from './libs/utils'
import { sparkleOptions } from './sparkleOptions'

import type { Container } from '@tsparticles/engine'

export type ParticlesProps = {
  id?: string
  class?: string
  background?: string
  particleSize?: number
  minSize?: number
  maxSize?: number
  speed?: number
  particleColor?: string
  particleDensity?: number
  options?: object
}

export function Sparkles(props: ParticlesProps) {
  const [opacity, setOpacity] = createSignal(0)

  const init = initParticlesEngine(loadSlim)

  const particlesLoaded = async (container?: Container) => {
    if (container) {
      setOpacity(1)
    }
  }

  const generatedId = crypto.randomUUID()

  return (
    <div class="particles">
      <Motion.div
        animate={{ opacity: opacity() }}
        transition={{ duration: 2 }}
        class={cn('opacity-0', props.class)}
      >
        <Show when={init()}>
          <Particles
            id={props.id || generatedId}
            class={cn('h-full w-full')}
            particlesLoaded={particlesLoaded}
            options={sparkleOptions(props)}
          />
        </Show>
      </Motion.div>
    </div>
  )
}

export function SparklesLogo() {
  return (
    // <div class="h-dvh w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
    <div class="h-dvh w-full bg-background flex flex-col items-center justify-center overflow-hidden rounded-md">
      <h1 class="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20">
        Sparkles
      </h1>

      <div class="w-[40rem] h-40 relative">
        {/* Gradients */}
        <div class="absolute inset-x-10 top-0 bg-gradient-to-r from-transparent via-secondary to-transparent h-[2px] w-10/12 blur-sm" />
        <div class="absolute inset-x-10 top-0 bg-gradient-to-r from-transparent via-secondary to-transparent h-px w-10/12" />
        <div class="absolute inset-x-40 top-0 bg-gradient-to-r from-transparent via-primary to-transparent h-[5px] w-1/2 blur-sm" />
        <div class="absolute inset-x-40 top-0 bg-gradient-to-r from-transparent via-primary to-transparent h-px w-1/2" />

        {/* Core component */}
        <Sparkles
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          class="w-full h-full"
          particleColor="#ffffff"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div class="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]" />
      </div>
    </div>
  )
}

export default Sparkles
