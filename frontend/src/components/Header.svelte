<script>
  import svelteLogo from "../assets/svelte.svg";
  import honoLogo from "../assets/hono.png";
  import LoveIcon from "../icons/LoveIcon.svelte";
  import DenoLogo from "../assets/Deno_2021.svg";
  import tailwindLogo from "../assets/tailwind.svg";
</script>

<div class="flex justify-center">
  <div
    class="relative flex gap-1 rounded-full px-3 py-1 text-sm leading-6 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-800/20"
  >
    Made with <LoveIcon class="w-4 text-red-600" /> by Fariz in
    <a href="/" class="font-semibold text-indigo-600">Surabaya</a>
  </div>
</div>

<div
  class="flex flex-wrap items-center justify-center gap-1 mt-2 text-gray-800 text-sm"
>
  <span class="text-gray-500 mr-2 text-xs">Version 1.0</span>
  <span class="mr-1">Build with</span>
  <a href="https://deno.land/">
    <img class="h-7 w-auto" src={DenoLogo} alt="Deno Logo" />
  </a>
  <a href="https://hono.dev/">
    <img class="h-7 w-auto" src={honoLogo} alt="Hono Logo" />
  </a>
  <a href="https://svelte.dev/">
    <img class="h-6 w-auto" src={svelteLogo} alt="Svelte Logo" />
  </a>
  <a href="https://svelte.dev/">
    <img class="h-6 w-auto ml-1" src={tailwindLogo} alt="Tailwind Logo" />
  </a>
</div>
