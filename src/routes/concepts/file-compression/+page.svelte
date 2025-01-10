<script>
    import { goto } from '$app/navigation';
    import { fade, slide } from 'svelte/transition';
    import { spring } from 'svelte/motion';

    // Sample files with compression data
    let files = [
        {
            id: 1,
            name: 'text_file.txt',
            type: 'text',
            originalSize: 1024,
            content: 'Lorem ipsum dolor sit amet...',
            compressionMethods: ['RLE', 'Huffman', 'LZW'],
            compressed: false,
            algorithm: 'RLE'
        },
        {
            id: 2,
            name: 'image.png',
            type: 'image',
            originalSize: 2048,
            content: 'Binary image data...',
            compressionMethods: ['RLE', 'LZW'],
            compressed: false,
            algorithm: 'RLE'
        }
    ];

    // Compression algorithms
    const algorithms = {
        RLE: {
            name: 'Run-Length Encoding',
            description: 'Replaces sequences of repeated characters with count and character',
            compressionRatio: 0.7,
            suitable: ['text', 'image']
        },
        Huffman: {
            name: 'Huffman Coding',
            description: 'Uses variable-length codes based on character frequency',
            compressionRatio: 0.6,
            suitable: ['text']
        },
        LZW: {
            name: 'Lempel-Ziv-Welch',
            description: 'Builds a dictionary of repeated patterns',
            compressionRatio: 0.5,
            suitable: ['text', 'image']
        }
    };

    let selectedFile = null;
    let compressionProgress = 0;
    let compressing = false;

    // Simulate compression
    async function compressFile(file) {
        if (compressing) return;
        compressing = true;
        compressionProgress = 0;
        
        const algorithm = algorithms[file.algorithm];
        const steps = 10;
        
        for (let i = 0; i <= steps; i++) {
            compressionProgress = i / steps;
            await new Promise(resolve => setTimeout(resolve, 200));
        }

        file.compressed = true;
        file.compressedSize = Math.floor(file.originalSize * algorithm.compressionRatio);
        compressing = false;
        compressionProgress = 0;
        files = [...files];
    }

    // Decompress file
    function decompressFile(file) {
        file.compressed = false;
        file.compressedSize = null;
        files = [...files];
    }

    // Calculate compression ratio
    function getCompressionRatio(file) {
        if (!file.compressed || !file.compressedSize) return 1;
        return file.compressedSize / file.originalSize;
    }

    // Get visual representation of compression
    function getCompressionVisual(file) {
        const ratio = getCompressionRatio(file);
        const blocks = 20;
        const filledBlocks = Math.ceil(blocks * ratio);
        return Array(blocks).fill(0).map((_, i) => i < filledBlocks);
    }

    // Format size
    function formatSize(bytes) {
        if (bytes < 1024) return `${bytes} B`;
        return `${(bytes / 1024).toFixed(1)} KB`;
    }

    // Get compression status class
    function getStatusClass(file) {
        if (compressing) return 'bg-yellow-100';
        return file.compressed ? 'bg-green-100' : 'bg-blue-100';
    }
</script>

<div class="min-h-screen bg-gradient-to-br from-cyan-100 via-blue-50 to-purple-100 p-4 md:p-8">
    <button
        on:click={() => goto('/concepts')}
        class="mb-8 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
               transition-colors flex items-center gap-2 shadow-md"
    >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
        Back to Concepts
    </button>

    <div class="max-w-7xl mx-auto space-y-8">
        <div class="text-center">
            <h1 class="text-4xl font-bold text-blue-800 mb-4">File Compression Tool</h1>
            <p class="text-lg text-blue-600">Explore different compression algorithms and their effects</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <!-- File List -->
            <div class="lg:col-span-4 bg-white rounded-xl shadow-lg p-6">
                <h2 class="text-xl font-semibold mb-4">Files</h2>
                <div class="space-y-4">
                    {#each files as file}
                        <div 
                            class="p-4 rounded-lg border transition-all cursor-pointer
                                   {getStatusClass(file)} {selectedFile === file ? 'ring-2 ring-blue-500' : ''}"
                            on:click={() => selectedFile = file}
                        >
                            <div class="flex justify-between items-start">
                                <div>
                                    <h3 class="font-semibold">{file.name}</h3>
                                    <div class="text-sm text-gray-600">
                                        Original: {formatSize(file.originalSize)}
                                        {#if file.compressed}
                                            <br>
                                            Compressed: {formatSize(file.compressedSize)}
                                        {/if}
                                    </div>
                                </div>
                                <select 
                                    bind:value={file.algorithm}
                                    class="text-sm border rounded p-1"
                                    disabled={file.compressed}
                                >
                                    {#each file.compressionMethods as method}
                                        <option value={method}>{method}</option>
                                    {/each}
                                </select>
                            </div>

                            {#if compressing && selectedFile === file}
                                <div class="mt-2">
                                    <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div 
                                            class="h-full bg-blue-500 transition-all duration-200"
                                            style="width: {compressionProgress * 100}%"
                                        />
                                    </div>
                                </div>
                            {/if}
                        </div>
                    {/each}
                </div>
            </div>

            <!-- Compression Details -->
            {#if selectedFile}
                <div class="lg:col-span-8 space-y-4">
                    <!-- Algorithm Info -->
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <h2 class="text-xl font-semibold mb-4">
                            {algorithms[selectedFile.algorithm].name}
                        </h2>
                        <p class="text-gray-600 mb-4">
                            {algorithms[selectedFile.algorithm].description}
                        </p>

                        <!-- Compression Visualization -->
                        <div class="space-y-4">
                            <h3 class="font-semibold">Size Comparison</h3>
                            <div class="flex gap-1">
                                {#each getCompressionVisual(selectedFile) as block}
                                    <div class="h-4 w-4 rounded {block ? 'bg-blue-500' : 'bg-gray-200'}" />
                                {/each}
                            </div>
                            
                            {#if selectedFile.compressed}
                                <div class="text-sm text-gray-600">
                                    Compression Ratio: {(getCompressionRatio(selectedFile) * 100).toFixed(1)}%
                                </div>
                            {/if}
                        </div>

                        <!-- Action Buttons -->
                        <div class="mt-6">
                            {#if selectedFile.compressed}
                                <button
                                    on:click={() => decompressFile(selectedFile)}
                                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Decompress File
                                </button>
                            {:else}
                                <button
                                    on:click={() => compressFile(selectedFile)}
                                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    disabled={compressing}
                                >
                                    Compress File
                                </button>
                            {/if}
                        </div>
                    </div>

                    <!-- Algorithm Comparison -->
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <h2 class="text-xl font-semibold mb-4">Algorithm Comparison</h2>
                        <div class="space-y-4">
                            {#each Object.entries(algorithms) as [key, algo]}
                                <div class="p-4 rounded-lg bg-gray-50">
                                    <h3 class="font-semibold">{algo.name}</h3>
                                    <div class="text-sm text-gray-600">
                                        Best for: {algo.suitable.join(', ')}
                                    </div>
                                    <div class="mt-2 text-sm">
                                        Typical compression: {(algo.compressionRatio * 100).toFixed()}%
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    /* Ensure proper sizing */
    svg {
        width: auto !important;
        height: auto !important;
        max-width: 2rem;
        max-height: 2rem;
    }

    /* Smooth transitions */
    button, div {
        @apply transition-all duration-200;
    }
</style>
