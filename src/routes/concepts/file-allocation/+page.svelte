<script>
    import { goto } from '$app/navigation';
    import { slide } from 'svelte/transition';
    
    // Block visualization data
    let blockSize = 1; // KB
    let totalBlocks = 32;
    let blocks = Array(totalBlocks).fill(null);
    
    // Sample files
    let files = [
        { id: 1, name: 'document.txt', size: 4, color: 'bg-blue-500', method: 'contiguous', blocks: [] },
        { id: 2, name: 'image.jpg', size: 6, color: 'bg-green-500', method: 'linked', blocks: [] },
        { id: 3, name: 'video.mp4', size: 8, color: 'bg-purple-500', method: 'indexed', blocks: [] }
    ];

    let selectedFile = files[0];
    let selectedMethod = 'contiguous';
    
    function allocateBlocks(file, method) {
        // Clear previous allocation
        blocks = blocks.map(block => block?.id === file.id ? null : block);
        
        switch(method) {
            case 'contiguous':
                let start = blocks.findIndex((block, i) => 
                    blocks.slice(i, i + file.size).every(b => b === null)
                );
                if (start >= 0) {
                    for(let i = 0; i < file.size; i++) {
                        blocks[start + i] = { 
                            id: file.id, 
                            name: file.name,
                            color: file.color,
                            index: i
                        };
                    }
                }
                break;
                
            case 'linked':
                let allocated = 0;
                let prev = null;
                blocks.forEach((block, i) => {
                    if (allocated < file.size && block === null) {
                        blocks[i] = { 
                            id: file.id,
                            name: file.name,
                            color: file.color,
                            next: null,
                            index: allocated
                        };
                        if (prev !== null) {
                            blocks[prev].next = i;
                        }
                        prev = i;
                        allocated++;
                    }
                });
                break;
                
            case 'indexed':
                let indexBlock = blocks.findIndex(block => block === null);
                let dataBlocks = [];
                let found = 0;
                
                if (indexBlock >= 0) {
                    blocks.forEach((block, i) => {
                        if (i !== indexBlock && block === null && found < file.size - 1) {
                            dataBlocks.push(i);
                            found++;
                        }
                    });
                    
                    if (found === file.size - 1) {
                        blocks[indexBlock] = {
                            id: file.id,
                            name: file.name,
                            color: file.color,
                            type: 'index',
                            pointers: dataBlocks
                        };
                        
                        dataBlocks.forEach((blockIndex, i) => {
                            blocks[blockIndex] = {
                                id: file.id,
                                name: file.name,
                                color: file.color,
                                type: 'data',
                                index: i
                            };
                        });
                    }
                }
                break;
        }
    }
</script>

<div class="min-h-screen bg-gradient-to-r from-blue-50 via-yellow-50 to-orange-50 p-8">
    <button
        on:click={() => goto('/concepts')}
        class="mb-8 px-6 py-2 bg-yellow-600 text-white rounded-full hover:bg-yellow-700 transition-colors"
    >
        Back to Concepts
    </button>

    <div class="max-w-6xl mx-auto">
        <h1 class="text-4xl font-bold text-yellow-800 mb-6">File Allocation Methods</h1>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Interactive Allocation Viewer -->
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h2 class="text-2xl font-semibold text-yellow-700 mb-4">Storage Blocks</h2>
                
                <div class="mb-4">
                    <label class="text-sm text-gray-600 mb-2 block">Select file and allocation method:</label>
                    <div class="flex gap-4 mb-4">
                        <select 
                            bind:value={selectedFile}
                            class="px-3 py-2 rounded-lg border border-gray-300"
                        >
                            {#each files as file}
                                <option value={file}>{file.name} ({file.size}KB)</option>
                            {/each}
                        </select>
                        
                        <select 
                            bind:value={selectedMethod}
                            class="px-3 py-2 rounded-lg border border-gray-300"
                        >
                            <option value="contiguous">Contiguous</option>
                            <option value="linked">Linked</option>
                            <option value="indexed">Indexed</option>
                        </select>
                        
                        <button
                            on:click={() => allocateBlocks(selectedFile, selectedMethod)}
                            class="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                        >
                            Allocate
                        </button>
                    </div>
                </div>

                <div class="grid grid-cols-8 gap-2 bg-gray-50 p-4 rounded-lg">
                    {#each blocks as block, i}
                        <div 
                            class="aspect-square rounded-lg border-2 border-gray-300 flex items-center justify-center text-xs font-mono
                                   {block ? block.color + ' text-white' : 'bg-white'}"
                            transition:slide
                        >
                            {#if block}
                                {#if block.type === 'index'}
                                    IDX
                                {:else if block.type === 'data'}
                                    {block.index}
                                {:else}
                                    {block.index}
                                {/if}
                            {:else}
                                {i}
                            {/if}
                        </div>
                    {/each}
                </div>
            </div>

            <!-- Explanation Section -->
            <div class="bg-white rounded-xl shadow-lg p-6 space-y-6">
                <h2 class="text-2xl font-semibold text-yellow-700">Allocation Methods</h2>
                
                <div transition:slide>
                    <h3 class="text-xl font-semibold text-yellow-600 mb-2">Contiguous Allocation</h3>
                    <p class="text-gray-700 mb-2">Files are stored in consecutive blocks.</p>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <p class="text-sm">Pros:</p>
                        <ul class="list-disc list-inside text-sm text-gray-600 ml-4">
                            <li>Simple implementation</li>
                            <li>Excellent read performance</li>
                        </ul>
                        <p class="text-sm mt-2">Cons:</p>
                        <ul class="list-disc list-inside text-sm text-gray-600 ml-4">
                            <li>External fragmentation</li>
                            <li>File size must be known</li>
                        </ul>
                    </div>
                </div>

                <div transition:slide>
                    <h3 class="text-xl font-semibold text-yellow-600 mb-2">Linked Allocation</h3>
                    <p class="text-gray-700 mb-2">Each block points to the next block in the file.</p>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <p class="text-sm">Pros:</p>
                        <ul class="list-disc list-inside text-sm text-gray-600 ml-4">
                            <li>No external fragmentation</li>
                            <li>File size can grow</li>
                        </ul>
                        <p class="text-sm mt-2">Cons:</p>
                        <ul class="list-disc list-inside text-sm text-gray-600 ml-4">
                            <li>No direct access</li>
                            <li>Space needed for pointers</li>
                        </ul>
                    </div>
                </div>

                <div transition:slide>
                    <h3 class="text-xl font-semibold text-yellow-600 mb-2">Indexed Allocation</h3>
                    <p class="text-gray-700 mb-2">Index block contains pointers to all file blocks.</p>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <p class="text-sm">Pros:</p>
                        <ul class="list-disc list-inside text-sm text-gray-600 ml-4">
                            <li>Direct access to blocks</li>
                            <li>No external fragmentation</li>
                        </ul>
                        <p class="text-sm mt-2">Cons:</p>
                        <ul class="list-disc list-inside text-sm text-gray-600 ml-4">
                            <li>Space for index block</li>
                            <li>Small file overhead</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .aspect-square {
        aspect-ratio: 1;
    }
</style>
