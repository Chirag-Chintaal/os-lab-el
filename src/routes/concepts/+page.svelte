<script>
    import { goto } from '$app/navigation';
</script>

<div class="min-h-screen bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 text-gray-900 font-sans">
    <section class="py-12 px-4 md:px-16">
        <div class="text-center mb-12">
            <button
                on:click={() => goto('/')}
                class="mb-8 px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
            >
                Back to Home
            </button>
            <h1 class="text-4xl font-bold text-purple-900">File System Tools</h1>
            <p class="text-xl text-gray-700 mt-4">Interactive tools to master file system concepts</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Allocation Visualizer -->
            <div class="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
                 on:click={() => goto('/concepts/file-allocation')}>
                <h3 class="text-xl font-bold mb-3 text-yellow-800">Allocation Visualizer</h3>
                <p class="text-gray-700">Explore how memory is allocated for files. Watch animations showing contiguous, linked, and indexed allocation methods in real-time.</p>
            </div>

            <!-- Directory Structure Explorer -->
            <div class="bg-gradient-to-br from-green-100 to-green-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
\                 on:click={() => goto('/concepts/directory-structures')}>
                <h3 class="text-xl font-bold mb-3 text-green-800">Directory Structure Explorer</h3>
                <p class="text-gray-700">Interact with tree-like visualizations of file directories. Click on folders to expand and navigate through hierarchical file systems.</p>
            </div>

            <!-- Metadata Analyzer -->
            <div class="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
                 on:click={() => goto('concepts/file-metadata')}>
                <h3 class="text-xl font-bold mb-3 text-blue-800">Metadata Analyzer</h3>
                <p class="text-gray-700">Understand the hidden details of files, including size, creation date, access permissions, and more, with an interactive breakdown.</p>
            </div>

            <!-- Disk Fragmentation Simulator -->
            <div class="bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
                 on:click={() => goto('/concepts/disk-fragmentation-simulator')}>
                <h3 class="text-xl font-bold mb-3 text-purple-800">Disk Fragmentation Simulator</h3>
                <p class="text-gray-700">Learn how fragmentation affects storage efficiency. Add, delete, and defragment files to see how the disk reorganizes itself.</p>
            </div>

            <!-- File Access Permissions Editor -->
            <div class="bg-gradient-to-br from-red-100 to-red-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
                 on:click={() => goto('/concepts/permissions-editor')}>
                <h3 class="text-xl font-bold mb-3 text-red-800">File Access Permissions Editor</h3>
                <p class="text-gray-700">Experiment with file permissions for different users. Toggle permissions and see their symbolic and octal representations.</p>
            </div>

            <!-- Indexed Allocation Explorer -->
            <div class="bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
                 on:click={() => goto('/concepts/indexed-allocation')}>
                <h3 class="text-xl font-bold mb-3 text-indigo-800">Indexed Allocation Explorer</h3>
                <p class="text-gray-700">Visualize how indexed allocation links data blocks through pointers. Click on blocks to explore their references.</p>
            </div>

            <!-- Virtual File System Mapper -->
            <div class="bg-gradient-to-br from-teal-100 to-teal-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
                 on:click={() => goto('/concepts/vfs-mapper')}>
                <h3 class="text-xl font-bold mb-3 text-teal-800">Virtual File System Mapper</h3>
                <p class="text-gray-700">Discover how VFS abstracts multiple file systems. Drag files across layers and observe system call translations.</p>
            </div>

            <!-- File Sharing Simulator -->
            <div class="bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
                 on:click={() => goto('/concepts/file-sharing')}>
                <h3 class="text-xl font-bold mb-3 text-orange-800">File Sharing Simulator</h3>
                <p class="text-gray-700">Simulate multi-user file sharing. Apply locks and see how conflicts like deadlocks can occur.</p>
            </div>

            <!-- File Compression Tool -->
            <div class="bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
                 on:click={() => goto('/concepts/file-compression')}>
                <h3 class="text-xl font-bold mb-3 text-pink-800">File Compression Tool</h3>
                <p class="text-gray-700">Experiment with compressing and decompressing files. See how algorithms reduce file sizes and what metadata is preserved.</p>
            </div>
        </div>
    </section>
</div>
