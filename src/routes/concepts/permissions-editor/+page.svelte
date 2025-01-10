<script>
    import { goto } from '$app/navigation';
    import { slide, fade } from 'svelte/transition';

    // Enhanced file system structure with more examples
    let files = [
        {
            id: 1,
            name: 'home',
            type: 'directory',
            owner: 'root',
            group: 'root',
            permissions: {
                user: { read: true, write: true, execute: true },
                group: { read: true, write: false, execute: true },
                others: { read: true, write: false, execute: true }
            },
            children: [
                {
                    id: 2,
                    name: 'alice',
                    type: 'directory',
                    owner: 'alice',
                    group: 'users',
                    permissions: {
                        user: { read: true, write: true, execute: true },
                        group: { read: false, write: false, execute: false },
                        others: { read: false, write: false, execute: false }
                    },
                    children: [
                        {
                            id: 3,
                            name: 'documents',
                            type: 'directory',
                            owner: 'alice',
                            group: 'users',
                            permissions: {
                                user: { read: true, write: true, execute: true },
                                group: { read: true, write: false, execute: true },
                                others: { read: false, write: false, execute: false }
                            },
                            children: [
                                {
                                    id: 4,
                                    name: 'report.pdf',
                                    type: 'file',
                                    owner: 'alice',
                                    group: 'users',
                                    permissions: {
                                        user: { read: true, write: true, execute: false },
                                        group: { read: true, write: false, execute: false },
                                        others: { read: false, write: false, execute: false }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ];

    // Enhanced users and groups
    let users = ['root', 'alice', 'bob', 'carol', 'dave'];
    let groups = ['root', 'users', 'admin', 'dev', 'public'];
    let selectedFile = null;

    // Permission calculation functions
    function getOctalPermissions(perms) {
        const calc = (p) => (p.read ? 4 : 0) + (p.write ? 2 : 0) + (p.execute ? 1 : 0);
        return `${calc(perms.user)}${calc(perms.group)}${calc(perms.others)}`;
    }

    function getSymbolicPermissions(perms) {
        const format = (p) => 
            `${p.read ? 'r' : '-'}${p.write ? 'w' : '-'}${p.execute ? 'x' : '-'}`;
        return `${format(perms.user)}${format(perms.group)}${format(perms.others)}`;
    }

    function togglePermission(file, category, permission) {
        file.permissions[category][permission] = !file.permissions[category][permission];
        files = files; // Trigger reactivity
    }

    function propagatePermissions(file) {
        if (file.children) {
            file.children = file.children.map(child => ({
                ...child,
                permissions: JSON.parse(JSON.stringify(file.permissions))
            }));
        }
    }

    function getPermissionColor(value) {
        return value ? 'bg-yellow-500' : 'bg-gray-300';
    }

    // New functions for enhanced functionality
    function getFileIcon(type) {
        return type === 'directory' 
            ? 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z'
            : 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z';
    }

    function getFileTypeColor(type) {
        return type === 'directory' ? 'text-emerald-600' : 'text-gray-600';
    }

    function getPermissionDescription(permission) {
        const descriptions = {
            read: 'Can view file contents',
            write: 'Can modify file contents',
            execute: 'Can run file as program'
        };
        return descriptions[permission];
    }

    // Add visual feedback for permission changes
    function handlePermissionToggle(file, category, permission) {
        togglePermission(file, category, permission);
        // Add subtle animation or feedback here
    }

    // Add new helper function for permission button classes
    function getPermissionButtonClass(isActive) {
        return `w-8 h-8 rounded-lg transition-all duration-200 flex items-center justify-center 
                ${isActive ? 'bg-emerald-500 text-white shadow-md' : 'bg-gray-200 text-gray-600'} 
                hover:scale-105 active:scale-95`;
    }
</script>

<div class="min-h-screen bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100 p-4 md:p-8">
    <button
        on:click={() => goto('/concepts')}
        class="mb-8 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 
               transition-colors flex items-center gap-2 shadow-md"
    >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
        Back to Concepts
    </button>

    <div class="max-w-7xl mx-auto space-y-8">
        <h1 class="text-4xl font-bold text-emerald-800 mb-6 flex items-center gap-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
            </svg>
            File Permissions Editor
        </h1>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <!-- File Browser - Make it narrower -->
            <div class="lg:col-span-4 bg-white rounded-xl shadow-lg p-6 border border-emerald-100 h-fit">
                <h2 class="text-2xl font-semibold text-emerald-700 mb-6 flex items-center gap-2">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                    File System
                </h2>
                
                <div class="space-y-3">
                    {#each files as file}
                        <div class="space-y-3">
                            <div
                                class="flex items-center justify-between p-4 rounded-lg hover:bg-emerald-50 
                                       cursor-pointer transition-colors border border-transparent
                                       hover:border-emerald-200 {selectedFile === file ? 'bg-emerald-50 border-emerald-200' : ''}"
                                on:click={() => selectedFile = file}
                            >
                                <div class="flex items-center space-x-3">
                                    <svg class="w-5 h-5 {getFileTypeColor(file.type)}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={getFileIcon(file.type)} />
                                    </svg>
                                    <span>{file.name}</span>
                                </div>
                                <span class="text-sm font-mono">{getSymbolicPermissions(file.permissions)}</span>
                            </div>

                            {#if file.children}
                                <div class="ml-6 space-y-3">
                                    {#each file.children as child}
                                        <div
                                            class="flex items-center justify-between p-4 rounded-lg hover:bg-emerald-50 
                                                   cursor-pointer transition-colors border border-transparent
                                                   hover:border-emerald-200 {selectedFile === child ? 'bg-emerald-50 border-emerald-200' : ''}"
                                            on:click={() => selectedFile = child}
                                        >
                                            <div class="flex items-center space-x-3">
                                                <svg class="w-5 h-5 {getFileTypeColor(child.type)}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={getFileIcon(child.type)} />
                                                </svg>
                                                <span>{child.name}</span>
                                            </div>
                                            <span class="text-sm font-mono">{getSymbolicPermissions(child.permissions)}</span>
                                        </div>
                                    {/each}
                                </div>
                            {/if}
                        </div>
                    {/each}
                </div>
            </div>

            <!-- Permission Editor - Make it wider -->
            {#if selectedFile}
                <div class="lg:col-span-8 bg-white rounded-xl shadow-lg p-6 border border-emerald-100" 
                     transition:slide|local>
                    <h2 class="text-2xl font-semibold text-emerald-700 mb-6 flex items-center gap-2">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                        {selectedFile.name}
                    </h2>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <!-- Owner and Group Selection -->
                        <div class="space-y-6">
                            <div>
                                <label class="text-sm text-gray-600 block">Owner:</label>
                                <select 
                                    bind:value={selectedFile.owner}
                                    class="w-full px-3 py-2 rounded-lg border border-gray-300"
                                >
                                    {#each users as user}
                                        <option value={user}>{user}</option>
                                    {/each}
                                </select>
                            </div>

                            <div>
                                <label class="text-sm text-gray-600 block">Group:</label>
                                <select 
                                    bind:value={selectedFile.group}
                                    class="w-full px-3 py-2 rounded-lg border border-gray-300"
                                >
                                    {#each groups as group}
                                        <option value={group}>{group}</option>
                                    {/each}
                                </select>
                            </div>

                            {#if selectedFile.type === 'directory'}
                                <button
                                    on:click={() => propagatePermissions(selectedFile)}
                                    class="w-full px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700
                                           transition-colors shadow-md hover:shadow-lg active:shadow-sm flex items-center justify-center gap-2"
                                >
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                              d="M19 9l-7 7-7-7"/>
                                    </svg>
                                    Apply to All Contents
                                </button>
                            {/if}
                        </div>

                        <!-- Permission Matrix -->
                        <div class="bg-gray-50 rounded-xl p-6 shadow-inner">
                            <div class="grid grid-cols-4 gap-4">
                                <div></div>
                                <div class="text-center text-sm font-semibold">Read</div>
                                <div class="text-center text-sm font-semibold">Write</div>
                                <div class="text-center text-sm font-semibold">Execute</div>

                                {#each ['user', 'group', 'others'] as category}
                                    <div class="text-sm font-semibold capitalize">{category}</div>
                                    {#each ['read', 'write', 'execute'] as permission}
                                        <div class="flex justify-center">
                                            <button
                                                class={getPermissionButtonClass(selectedFile.permissions[category][permission])}
                                                on:click={() => handlePermissionToggle(selectedFile, category, permission)}
                                            />
                                        </div>
                                    {/each}
                                {/each}
                            </div>

                            <div class="mt-4 text-center space-x-4">
                                <span class="text-sm font-mono">
                                    Numeric: {getOctalPermissions(selectedFile.permissions)}
                                </span>
                                <span class="text-sm font-mono">
                                    Symbolic: {getSymbolicPermissions(selectedFile.permissions)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Permission explanation panel -->
                    <div class="mt-8 p-6 bg-emerald-50 rounded-xl border border-emerald-200">
                        <h3 class="font-semibold text-emerald-700 mb-2">Permission Details</h3>
                        <div class="space-y-2 text-sm text-emerald-600">
                            {#each ['read', 'write', 'execute'] as permission}
                                <p>
                                    <span class="font-semibold">{permission}:</span> 
                                    {getPermissionDescription(permission)}
                                </p>
                            {/each}
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    /* Enhanced transitions and animations */
    :global(.permission-toggle) {
        @apply transition-all duration-300 transform;
    }
    
    :global(.permission-toggle:hover) {
        @apply scale-110 shadow-lg;
    }
    
    :global(.file-item) {
        @apply transition-all duration-200;
    }
    
    :global(.file-item:hover) {
        @apply shadow-md;
    }

    /* Add smooth transitions for all interactive elements */
    button, select {
        @apply transition-all duration-200;
    }

    svg {
        width: auto !important;
        height: auto !important;
        max-width: 2rem;
        max-height: 2rem;
    }
</style>
