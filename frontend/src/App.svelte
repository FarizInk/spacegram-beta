<script lang="ts">
  import Dropzone from "svelte-file-dropzone/Dropzone.svelte";
  import ZasiferIcon from "./icons/ZasiferIcon.svelte";
  import FileUploadIcon from "./icons/FileUploadIcon.svelte";
  import CloseIcon from "./icons/CloseIcon.svelte";
  import FileTextIcon from "./icons/FileTextIcon.svelte";
  import ArrowSquareOutIcon from "./icons/ArrowSquareOutIcon.svelte";
  import Header from "./components/Header.svelte";

  let files = [];

  function handleFilesSelect(e) {
    containerDragDrop = false;
    const { acceptedFiles, fileRejections } = e.detail;

    files = [...files, ...acceptedFiles];
  }

  // src: https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
  const calculateSize = (bytes, decimals = 2) => {
    if (!+bytes) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = [
      "Bytes",
      "KiB",
      "MiB",
      "GiB",
      "TiB",
      "PiB",
      "EiB",
      "ZiB",
      "YiB",
    ];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  let containerDragDrop = false;
  const handleDragEnter = () => (containerDragDrop = true);
  const handleDragLeave = () => (containerDragDrop = false);
  const maxSizeUpload = 104857600;
  const acctAttr = ["application/json", "video/*", "image/*"];
</script>

<div id="container" class="bg-white min-w-screen min-h-screen relative isolate max-w-screen overflow-hidden">
  <Dropzone
    on:drop={handleFilesSelect}
    noClick
    on:dragenter={handleDragEnter}
    on:dragleave={handleDragLeave}
    maxSize={maxSizeUpload}
    accept={acctAttr}
  >
    {#if containerDragDrop}
      <div class="absolute w-screen h-screen bg-white bg-opacity-60 z-10 p-12 top-0 left-0 text-black">
        <div
          class="w-full h-full border-2 border-black border-dashed flex flex-col items-center justify-center rounded-xl"
        >
          <FileUploadIcon class="w-[200px]" />
          <div>Maximum file size 100 MB.</div>
        </div>
      </div>
    {/if}

    <div
      class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      aria-hidden="true"
    >
      <div
        class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
      />
    </div>

    <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
      <div
        id="logo-container"
        class="relativeflex items-center justify-center mb-5"
      >
        <Dropzone
          on:drop={handleFilesSelect}
          noDrag
          maxSize={maxSizeUpload}
          accept={acctAttr}
        >
          <ZasiferIcon
            class="w-10 text-black hover:scale-125 ease-in-out duration-100"
          />
          <ZasiferIcon
            class="w-10 text-black absolute animate-ping opacity-40 -z-10"
          />
        </Dropzone>
      </div>

      <Header />

      <div class="mt-10 space-y-4">
        {#each files.reverse() as item}
          <div
            class="group relative rounded-lg border-2 border-black max-w-[400px]"
          >
            <div
              class="absolute opacity-0 w-full h-full bg-black text-white group-hover:opacity-100 flex justify-center items-center gap-2"
            >
              <button
                type="button"
                class="p-2 text-green-500 border border-green-500 rounded-full hover:bg-green-500 hover:text-white"
              >
                <ArrowSquareOutIcon class="w-4" />
              </button>
              <button
                type="button"
                class="p-2 text-red-500 border border-red-500 rounded-full hover:bg-red-500 hover:text-white"
              >
                <CloseIcon class="w-4" />
              </button>
            </div>
            <div class="p-2">
              <div class="flex gap-2 justify-between items-center">
                <FileTextIcon class="w-7 text-black" />
                <div class="flex-1 max-w-[300px]">
                  <div class="text-black truncate font-semibold">
                    {item.name}
                  </div>
                  <div class="text-sm text-gray-500">
                    {calculateSize(item.size)}
                  </div>
                </div>
              </div>
              <div class="mt-1 flex items-center gap-2 text-black">
                <div class="rounded-full border border-black w-full h-2 flex-1">
                  <div class="bg-black h-full" style="width: 90%;" />
                </div>
                <div class="flex items-center justify-center text-sm">100%</div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <div
      class="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl"
      aria-hidden="true"
    >
      <div
        class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
      />
    </div>
  </Dropzone>
</div>
