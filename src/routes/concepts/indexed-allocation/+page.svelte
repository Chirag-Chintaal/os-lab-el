<script>
    import { goto } from '$app/navigation';
    import { fade, slide } from 'svelte/transition';
    import { spring } from 'svelte/motion';

    // Data structure for blocks
    let blocks = [];
    let indexBlock = null;
    let selectedBlock = null;
    let maxBlocks = 10;

    // Initialize with some blocks
    function initializeBlocks() {
        indexBlock = {
            id: 'index',
            type: 'index',
            pointers: []
        };
        
        blocks = [];
        for (let i = 0; i < 5; i++) {
            addBlock();
        }
    }

    // Add a new data block
    function addBlock() {
        if (blocks.length < maxBlocks) {
            const newBlock = {
                id: blocks.length,
                type: 'data',
                content: `Data Block ${blocks.length}`,
                size: Math.floor(Math.random() * 100) + 50
            };
            blocks = [...blocks, newBlock];
            indexBlock.pointers = [...indexBlock.pointers, newBlock.id];
        }
    }

    // Remove a block
    function removeBlock(id) {
        blocks = blocks.filter(block => block.id !== id);
        indexBlock.pointers = indexBlock.pointers.filter(ptr => ptr !== id);
    }

    // Initialize on mount
    initializeBlocks();
</script>

<div class="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4 md:p-8">
    <button
        on:click={() => goto('/concepts')}
        class="mb-8 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 
               transition-colors flex items-center gap-2 shadow-md"
    >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
        Back to Concepts
    </button>

    <div class="max-w-7xl mx-auto space-y-8">
        <div class="text-center">
            <h1 class="text-4xl font-bold text-indigo-800 mb-4">Indexed Allocation Explorer</h1>
            <p class="text-lg text-indigo-600">Visualize how files are stored using indexed allocation</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <!-- Controls -->
            <div class="lg:col-span-3 bg-white rounded-xl shadow-lg p-6">
                <div class="space-y-4">
                    <button
                        on:click={addBlock}
                        disabled={blocks.length >= maxBlocks}
                        class="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg 
                               hover:bg-indigo-700 disabled:bg-gray-400 transition-colors"
                    >
                        Add Block
                    </button>

                    <div class="text-sm text-gray-600">
                        Blocks: {blocks.length} / {maxBlocks}
                    </div>
                </div>
            </div>

            <!-- Visualization -->
            <div class="lg:col-span-9 bg-white rounded-xl shadow-lg p-6">
                <div class="space-y-8">
                    <!-- Index Block -->
                    <div class="bg-indigo-100 p-4 rounded-lg">
                        <h3 class="text-lg font-semibold text-indigo-800 mb-4">Index Block</h3>
                        <div class="grid grid-cols-5 gap-2">
                            {#each indexBlock.pointers as pointer}
                                <div class="bg-indigo-200 p-2 rounded text-center text-sm">
                                    → {pointer}
                                </div>
                            {/each}
                        </div>
                    </div>

                    <!-- Data Blocks -->
                    <div class="grid grid-cols-5 gap-4">
                        {#each blocks as block (block.id)}
                            <div
                                class="relative bg-purple-100 p-4 rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                                on:click={() => selectedBlock = block}
                                on:dblclick={() => removeBlock(block.id)}
                                in:fade
                            >
                                <div class="text-center">
                                    <div class="font-mono text-lg text-purple-800">#{block.id}</div>
                                    <div class="text-sm text-purple-600">{block.size} bytes</div>
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        </div>

        <!-- Information Panel -->
        <div class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-2xl font-bold text-indigo-800 mb-4">How Indexed Allocation Works</h2>
            <div class="prose max-w-none">
                <p>
                    Indexed allocation uses a special index block that contains pointers to all the data blocks of a file.
                    This method provides direct access to any block and is efficient for both sequential and direct access.
                </p>
                <ul class="mt-4 space-y-2">
                    <li>Double-click a block to remove it</li>
                    <li>The index block automatically updates when blocks are added or removed</li>
                    <li>Each block maintains its own size and metadata</li>
                </ul>
            </div>
        </div>
    </div>
</div>

<style>
    /* Add smooth transitions for interactive elements */
    button {
        @apply transition-all duration-200;
    }

    /* Ensure SVGs maintain proper sizing */
    svg {
        width: auto !important;
        height: auto !important;
        max-width: 2rem;
        max-height: 2rem;
    }
</style>
