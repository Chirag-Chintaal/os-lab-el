<script>
    import { goto } from '$app/navigation';
    import { fade, slide } from 'svelte/transition';
    
    // VFS Layer definitions
    const vfsLayers = [
        {
            name: "System Call Interface",
            description: "User space interface for file operations",
            color: "from-purple-100 to-purple-200",
            operations: ["open()", "read()", "write()", "close()"]
        },
        {
            name: "Virtual File System Layer",
            description: "Abstract interface for multiple filesystems",
            color: "from-blue-100 to-blue-200",
            operations: ["vfs_open()", "vfs_read()", "vfs_write()", "vfs_close()"]
        },
        {
            name: "Filesystem Types",
            description: "Specific filesystem implementations",
            color: "from-green-100 to-green-200",
            systems: ["ext4", "NTFS", "FAT32", "XFS"]
        }
    ];

    // File operation simulation
    let currentOperation = null;
    let activeLayer = null;
    
    // Sample files for different filesystems
    let files = {
        ext4: [
            { name: "document.txt", size: "2.4 MB", type: "text" },
            { name: "image.jpg", size: "5.1 MB", type: "image" }
        ],
        NTFS: [
            { name: "video.mp4", size: "145 MB", type: "video" },
            { name: "archive.zip", size: "34 MB", type: "archive" }
        ],
        FAT32: [
            { name: "music.mp3", size: "3.8 MB", type: "audio" },
            { name: "notes.doc", size: "1.2 MB", type: "document" }
        ]
    };

    // Simulate operation flow
    function simulateOperation(operation) {
        currentOperation = operation;
        // Animation would show operation flowing through layers
        setTimeout(() => currentOperation = null, 2000);
    }

    // Get icon for file type
    function getFileIcon(type) {
        const icons = {
            text: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
            image: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
            video: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z",
            audio: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3",
            document: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
            archive: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
        };
        return icons[type] || icons.document;
    }
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
            <h1 class="text-4xl font-bold text-indigo-800 mb-4">Virtual File System Mapper</h1>
            <p class="text-lg text-indigo-600">Explore how VFS abstracts different filesystem operations</p>
        </div>

        <!-- VFS Layer Visualization -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <!-- Layers Panel -->
            <div class="lg:col-span-8 space-y-4">
                {#each vfsLayers as layer, i}
                    <div 
                        class="bg-gradient-to-r {layer.color} p-6 rounded-xl shadow-md"
                        on:mouseenter={() => activeLayer = layer}
                        on:mouseleave={() => activeLayer = null}
                        transition:slide
                    >
                        <h3 class="text-xl font-semibold mb-2">{layer.name}</h3>
                        <p class="text-sm text-gray-700 mb-4">{layer.description}</p>
                        
                        {#if layer.operations}
                            <div class="flex flex-wrap gap-2">
                                {#each layer.operations as op}
                                    <button 
                                        class="px-3 py-1 bg-white/50 rounded-lg hover:bg-white/80 transition-colors"
                                        on:click={() => simulateOperation(op)}
                                    >
                                        {op}
                                    </button>
                                {/each}
                            </div>
                        {/if}

                        {#if layer.systems}
                            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {#each layer.systems as fs}
                                    <div class="bg-white/50 p-3 rounded-lg">
                                        <h4 class="font-medium">{fs}</h4>
                                        <div class="text-sm text-gray-600">
                                            {files[fs]?.length || 0} files
                                        </div>
                                    </div>
                                {/each}
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>

            <!-- File Browser Panel -->
            <div class="lg:col-span-4 bg-white rounded-xl shadow-lg p-6">
                <h2 class="text-xl font-semibold mb-4">File Browser</h2>
                
                {#each Object.entries(files) as [fs, fileList]}
                    <div class="mb-6">
                        <h3 class="text-sm font-medium text-gray-500 mb-2">{fs}</h3>
                        <div class="space-y-2">
                            {#each fileList as file}
                                <div class="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                                    <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                              d={getFileIcon(file.type)} />
                                    </svg>
                                    <div>
                                        <div class="text-sm font-medium">{file.name}</div>
                                        <div class="text-xs text-gray-500">{file.size}</div>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </div>
                {/each}
            </div>
        </div>

        <!-- Operation Flow Visualization -->
        {#if currentOperation}
            <div class="fixed bottom-8 right-8 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg"
                 transition:fade>
                Executing: {currentOperation}
            </div>
        {/if}
    </div>
</div>

<style>
    /* Ensure SVGs maintain proper sizing */
    svg {
        width: auto !important;
        height: auto !important;
        max-width: 2rem;
        max-height: 2rem;
    }

    /* Add smooth transitions */
    button, div {
        @apply transition-all duration-200;
    }
</style>
