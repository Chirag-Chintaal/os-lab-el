<script>
    import { goto } from '$app/navigation';
    import { fade, slide } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';

    // Disk configuration
    let blockSize = 1; // KB
    let totalBlocks = 64;
    let blocks = Array(totalBlocks).fill(null);
    
    // File management
    let nextFileId = 1;
    let files = [];
    let selectedFile = null;
    
    // Stats
    $: fragmentation = calculateFragmentation();
    $: freeSpace = blocks.filter(b => b === null).length * blockSize;
    $: largestContiguous = findLargestContiguous();
    
    // UI state
    let isDefragmenting = false;
    let newFileName = '';
    let newFileSize = 1;
    const colors = [
        'bg-blue-500', 'bg-green-500', 'bg-purple-500', 
        'bg-red-500', 'bg-yellow-500', 'bg-indigo-500'
    ];

    function calculateFragmentation() {
        let fragments = 0;
        let prevBlock = null;
        blocks.forEach(block => {
            if (block !== null && prevBlock !== block?.id) fragments++;
            prevBlock = block?.id;
        });
        return fragments;
    }

    function findLargestContiguous() {
        let maxSize = 0;
        let currentSize = 0;
        blocks.forEach(block => {
            if (block === null) {
                currentSize++;
                maxSize = Math.max(maxSize, currentSize);
            } else {
                currentSize = 0;
            }
        });
        return maxSize;
    }

    async function addFile() {
        if (!newFileName || newFileSize < 1) return;
        
        const color = colors[files.length % colors.length];
        const file = {
            id: nextFileId++,
            name: newFileName,
            size: newFileSize,
            color,
            fragments: []
        };

        let allocated = 0;
        let fragments = [];
        let currentFragment = [];

        for (let i = 0; i < blocks.length && allocated < newFileSize; i++) {
            if (blocks[i] === null) {
                blocks[i] = {
                    id: file.id,
                    index: allocated,
                    color
                };
                currentFragment.push(i);
                allocated++;
            } else if (currentFragment.length > 0) {
                fragments.push(currentFragment);
                currentFragment = [];
            }
        }

        if (currentFragment.length > 0) {
            fragments.push(currentFragment);
        }

        if (allocated === newFileSize) {
            file.fragments = fragments;
            files = [...files, file];
            newFileName = '';
            newFileSize = 1;
        } else {
            // Rollback if allocation failed
            blocks = blocks.map(block => block?.id === file.id ? null : block);
            alert('Not enough contiguous space!');
        }
    }

    function deleteFile(fileId) {
        blocks = blocks.map(block => block?.id === fileId ? null : block);
        files = files.filter(f => f.id !== fileId);
    }

    async function defragment() {
        isDefragmenting = true;
        
        for (let file of files) {
            let fileBlocks = blocks
                .map((block, index) => ({ block, index }))
                .filter(({ block }) => block?.id === file.id)
                .sort((a, b) => a.block.index - b.block.index);

            let targetIndex = blocks.findIndex(b => b === null);
            
            for (let { block, index } of fileBlocks) {
                if (index !== targetIndex) {
                    // Animate the move
                    blocks[targetIndex] = block;
                    blocks[index] = null;
                    await new Promise(r => setTimeout(r, 100));
                }
                targetIndex++;
            }
        }
        
        isDefragmenting = false;
    }
</script>

<div class="min-h-screen bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 p-8">
    <button
        on:click={() => goto('/concepts')}
        class="mb-8 px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
    >
        Back to Concepts
    </button>

    <div class="max-w-7xl mx-auto">
        <h1 class="text-4xl font-bold text-purple-800 mb-6">Disk Fragmentation Simulator</h1>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Controls Panel -->
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h2 class="text-2xl font-semibold text-purple-700 mb-4">File Operations</h2>
                
                <div class="space-y-4">
                    <div>
                        <label class="text-sm text-gray-600 block">File Name:</label>
                        <input
                            bind:value={newFileName}
                            type="text"
                            class="w-full px-3 py-2 rounded-lg border border-gray-300"
                            placeholder="Enter file name"
                        />
                    </div>
                    
                    <div>
                        <label class="text-sm text-gray-600 block">Size (KB):</label>
                        <input
                            bind:value={newFileSize}
                            type="number"
                            min="1"
                            max={totalBlocks}
                            class="w-full px-3 py-2 rounded-lg border border-gray-300"
                        />
                    </div>
                    
                    <button
                        on:click={addFile}
                        class="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                        disabled={isDefragmenting}
                    >
                        Add File
                    </button>
                    
                    <button
                        on:click={defragment}
                        class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        disabled={isDefragmenting}
                    >
                        Defragment Disk
                    </button>
                </div>

                <!-- Stats -->
                <div class="mt-6 space-y-2">
                    <p class="text-sm text-gray-600">
                        Fragmentation: <span class="font-bold">{fragmentation} fragments</span>
                    </p>
                    <p class="text-sm text-gray-600">
                        Free Space: <span class="font-bold">{freeSpace}KB</span>
                    </p>
                    <p class="text-sm text-gray-600">
                        Largest Contiguous: <span class="font-bold">{largestContiguous}KB</span>
                    </p>
                </div>
            </div>

            <!-- Disk Visualization -->
            <div class="bg-white rounded-xl shadow-lg p-6 lg:col-span-2">
                <h2 class="text-2xl font-semibold text-purple-700 mb-4">Disk Blocks</h2>
                
                <div class="grid grid-cols-8 gap-2 bg-gray-50 p-4 rounded-lg mb-6">
                    {#each blocks as block, i}
                        <div 
                            class="aspect-square rounded-lg border-2 border-gray-300 flex items-center justify-center text-xs font-mono
                                   {block ? block.color + ' text-white' : 'bg-white'}"
                            transition:slide
                        >
                            {#if block}
                                {block.index}
                            {:else}
                                {i}
                            {/if}
                        </div>
                    {/each}
                </div>

                <!-- File List -->
                <div class="space-y-2">
                    {#each files as file}
                        <div 
                            class="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100"
                            transition:slide
                        >
                            <div class="flex items-center space-x-3">
                                <div class={`w-4 h-4 rounded ${file.color}`}></div>
                                <span class="font-medium">{file.name}</span>
                                <span class="text-sm text-gray-500">({file.size}KB)</span>
                            </div>
                            <button
                                on:click={() => deleteFile(file.id)}
                                class="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                                disabled={isDefragmenting}
                            >
                                Delete
                            </button>
                        </div>
                    {/each}
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
