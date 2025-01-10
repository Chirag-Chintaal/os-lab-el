<script>
    import { goto } from '$app/navigation';
    import { slide } from 'svelte/transition';

    let selectedFile = {
        name: 'document.txt',
        size: '256 KB',
        created: '2023-11-15 10:30:00',
        modified: '2023-11-16 15:45:22',
        accessed: '2023-11-16 16:00:00',
        owner: 'user1',
        group: 'users',
        permissions: 'rw-r--r--',
        type: 'text/plain',
        location: '/home/user1/documents/'
    };

    const sampleFiles = [
        {
            name: 'document.txt',
            size: '256 KB',
            created: '2023-11-15 10:30:00',
            modified: '2023-11-16 15:45:22',
            accessed: '2023-11-16 16:00:00',
            owner: 'user1',
            group: 'users',
            permissions: 'rw-r--r--',
            type: 'text/plain',
            location: '/home/user1/documents/'
        },
        {
            name: 'image.jpg',
            size: '1.2 MB',
            created: '2023-11-14 09:15:00',
            modified: '2023-11-14 09:15:00',
            accessed: '2023-11-16 14:20:00',
            owner: 'user1',
            group: 'users',
            permissions: 'rw-r--r--',
            type: 'image/jpeg',
            location: '/home/user1/pictures/'
        },
        {
            name: 'script.sh',
            size: '4 KB',
            created: '2023-11-10 16:45:00',
            modified: '2023-11-15 11:30:00',
            accessed: '2023-11-16 09:00:00',
            owner: 'root',
            group: 'root',
            permissions: 'rwxr-xr-x',
            type: 'application/x-sh',
            location: '/usr/local/bin/'
        }
    ];

    function formatPermissions(perms) {
        const parts = perms.match(/.{1,3}/g);
        return parts.map((part, i) => {
            const who = i === 0 ? 'owner' : i === 1 ? 'group' : 'others';
            return {
                who,
                read: part[0] === 'r',
                write: part[1] === 'w',
                execute: part[2] === 'x'
            };
        });
    }

    $: permissionsParts = formatPermissions(selectedFile.permissions);
</script>

<div class="min-h-screen bg-gradient-to-r from-blue-50 via-pink-50 to-purple-50 p-8">
    <button
        on:click={() => goto('/concepts')}
        class="mb-8 px-6 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors"
    >
        Back to Concepts
    </button>

    <div class="max-w-6xl mx-auto">
        <h1 class="text-4xl font-bold text-pink-800 mb-6">File Metadata</h1>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Interactive Metadata Viewer -->
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h2 class="text-2xl font-semibold text-pink-700 mb-4">Metadata Viewer</h2>
                
                <div class="mb-4">
                    <label class="text-sm text-gray-600 mb-2 block">Select a file:</label>
                    <div class="space-y-2">
                        {#each sampleFiles as file}
                            <button
                                class="w-full text-left px-4 py-2 rounded-lg hover:bg-pink-50 transition-colors
                                       {selectedFile.name === file.name ? 'bg-pink-100 border border-pink-200' : 'bg-gray-50'}"
                                on:click={() => selectedFile = file}
                            >
                                {file.name}
                            </button>
                        {/each}
                    </div>
                </div>

                <div class="bg-gray-50 p-4 rounded-lg">
                    <h3 class="font-semibold text-lg mb-3 text-pink-600">{selectedFile.name}</h3>
                    <div class="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p class="text-gray-600">Size:</p>
                            <p class="font-mono">{selectedFile.size}</p>
                        </div>
                        <div>
                            <p class="text-gray-600">Type:</p>
                            <p class="font-mono">{selectedFile.type}</p>
                        </div>
                        <div>
                            <p class="text-gray-600">Created:</p>
                            <p class="font-mono">{selectedFile.created}</p>
                        </div>
                        <div>
                            <p class="text-gray-600">Modified:</p>
                            <p class="font-mono">{selectedFile.modified}</p>
                        </div>
                        <div>
                            <p class="text-gray-600">Accessed:</p>
                            <p class="font-mono">{selectedFile.accessed}</p>
                        </div>
                        <div>
                            <p class="text-gray-600">Owner:</p>
                            <p class="font-mono">{selectedFile.owner}:{selectedFile.group}</p>
                        </div>
                        <div>
                            <p class="text-gray-600">Permissions:</p>
                            <div class="grid grid-cols-3 gap-2">
                                {#each permissionsParts as part}
                                    <div class="text-center">
                                        <p class="font-semibold text-gray-700">{part.who}</p>
                                        <p class="font-mono">{part.read ? 'r' : '-'}</p>
                                        <p class="font-mono">{part.write ? 'w' : '-'}</p>
                                        <p class="font-mono">{part.execute ? 'x' : '-'}</p>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Explanations -->
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h2 class="text-2xl font-semibold text-pink-700 mb-4">Metadata Explanations</h2>
                <div class="space-y-4">
                    <div>
                        <h3 class="font-semibold text-lg text-pink-600">File Name</h3>
                        <p class="text-gray-600">The name of the file, including its extension.</p>
                    </div>
                    <div>
                        <h3 class="font-semibold text-lg text-pink-600">Size</h3>
                        <p class="text-gray-600">The size of the file in bytes, kilobytes, megabytes, etc.</p>
                    </div>
                    <div>
                        <h3 class="font-semibold text-lg text-pink-600">Type</h3>
                        <p class="text-gray-600">The MIME type of the file, indicating its format.</p>
                    </div>
                    <div>
                        <h3 class="font-semibold text-lg text-pink-600">Created</h3>
                        <p class="text-gray-600">The date and time when the file was created.</p>
                    </div>
                    <div>
                        <h3 class="font-semibold text-lg text-pink-600">Modified</h3>
                        <p class="text-gray-600">The date and time when the file was last modified.</p>
                    </div>
                    <div>
                        <h3 class="font-semibold text-lg text-pink-600">Accessed</h3>
                        <p class="text-gray-600">The date and time when the file was last accessed.</p>
                    </div>
                    <div>
                        <h3 class="font-semibold text-lg text-pink-600">Owner</h3>
                        <p class="text-gray-600">The user who owns the file and the group it belongs to.</p>
                    </div>
                    <div>
                        <h3 class="font-semibold text-lg text-pink-600">Permissions</h3>
                        <p class="text-gray-600">The file permissions, indicating who can read, write, and execute the file.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
