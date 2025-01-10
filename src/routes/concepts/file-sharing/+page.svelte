<script>
    import { goto } from '$app/navigation';
    import { fade, slide } from 'svelte/transition';
    import { spring } from 'svelte/motion';

    // File sharing system state
    let sharedFiles = [
        {
            id: 1,
            name: 'shared_document.txt',
            content: 'This is a shared document',
            lockedBy: null,
            waitingUsers: [],
            accessHistory: [],
            type: 'text'
        },
        {
            id: 2,
            name: 'project_data.db',
            content: 'Database contents...',
            lockedBy: null,
            waitingUsers: [],
            accessHistory: [],
            type: 'database'
        }
    ];

    // Active users
    let users = [
        { id: 1, name: 'Alice', color: 'blue' },
        { id: 2, name: 'Bob', color: 'green' },
        { id: 3, name: 'Carol', color: 'purple' }
    ];

    let selectedFile = null;
    let activeUser = users[0];
    let lockTimeout = null;
    let notifications = [];

    // Lock management
    function requestLock(file, user) {
        if (file.lockedBy === null) {
            file.lockedBy = user;
            addAccessRecord(file, user, 'acquired lock');
            notify(`${user.name} acquired lock on ${file.name}`);
        } else if (file.lockedBy !== user) {
            if (!file.waitingUsers.includes(user)) {
                file.waitingUsers = [...file.waitingUsers, user];
                addAccessRecord(file, user, 'waiting for lock');
                notify(`${user.name} waiting for lock on ${file.name}`);
            }
        }
        sharedFiles = [...sharedFiles]; // Trigger reactivity
    }

    function releaseLock(file, user) {
        if (file.lockedBy === user) {
            file.lockedBy = null;
            addAccessRecord(file, user, 'released lock');
            notify(`${user.name} released lock on ${file.name}`);

            // Grant lock to next waiting user
            if (file.waitingUsers.length > 0) {
                const nextUser = file.waitingUsers[0];
                file.waitingUsers = file.waitingUsers.slice(1);
                requestLock(file, nextUser);
            }
        }
        sharedFiles = [...sharedFiles];
    }

    // Access history management
    function addAccessRecord(file, user, action) {
        file.accessHistory = [...file.accessHistory, {
            user,
            action,
            timestamp: new Date()
        }];
    }

    // Notification system
    function notify(message) {
        notifications = [...notifications, {
            id: Date.now(),
            message,
            timestamp: new Date()
        }];
        setTimeout(() => {
            notifications = notifications.filter(n => n.id !== Date.now());
        }, 3000);
    }

    // Auto-release lock after timeout
    function startLockTimeout(file, user) {
        if (lockTimeout) clearTimeout(lockTimeout);
        lockTimeout = setTimeout(() => {
            releaseLock(file, user);
        }, 10000); // 10 second timeout
    }

    // Get status class for file
    function getStatusClass(file) {
        if (file.lockedBy) return 'bg-red-100';
        if (file.waitingUsers.length > 0) return 'bg-yellow-100';
        return 'bg-green-100';
    }
</script>

<div class="min-h-screen bg-gradient-to-br from-orange-100 via-amber-50 to-yellow-100 p-4 md:p-8">
    <button
        on:click={() => goto('/concepts')}
        class="mb-8 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 
               transition-colors flex items-center gap-2 shadow-md"
    >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
        Back to Concepts
    </button>

    <div class="max-w-7xl mx-auto space-y-8">
        <div class="text-center">
            <h1 class="text-4xl font-bold text-orange-800 mb-4">File Sharing Simulator</h1>
            <p class="text-lg text-orange-600">Explore file sharing mechanisms and lock management</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <!-- User Selection -->
            <div class="lg:col-span-3 space-y-4">
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h2 class="text-xl font-semibold mb-4">Active Users</h2>
                    <div class="space-y-2">
                        {#each users as user}
                            <button
                                class="w-full p-3 rounded-lg border-2 transition-all
                                       {activeUser === user ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-200'}"
                                on:click={() => activeUser = user}
                            >
                                <div class="flex items-center gap-2">
                                    <div class="w-3 h-3 rounded-full" style="background-color: {user.color}"></div>
                                    {user.name}
                                </div>
                            </button>
                        {/each}
                    </div>
                </div>
            </div>

            <!-- Shared Files -->
            <div class="lg:col-span-9 space-y-4">
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h2 class="text-xl font-semibold mb-4">Shared Files</h2>
                    <div class="space-y-4">
                        {#each sharedFiles as file}
                            <div class="p-4 rounded-lg border {getStatusClass(file)} transition-all">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <h3 class="font-semibold">{file.name}</h3>
                                        <div class="text-sm text-gray-600">
                                            {#if file.lockedBy}
                                                Locked by {file.lockedBy.name}
                                            {:else}
                                                Available
                                            {/if}
                                        </div>
                                    </div>
                                    <div class="space-x-2">
                                        {#if file.lockedBy === activeUser}
                                            <button
                                                class="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                                                on:click={() => releaseLock(file, activeUser)}
                                            >
                                                Release Lock
                                            </button>
                                        {:else}
                                            <button
                                                class="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                                                on:click={() => requestLock(file, activeUser)}
                                                disabled={file.waitingUsers.includes(activeUser)}
                                            >
                                                Request Lock
                                            </button>
                                        {/if}
                                    </div>
                                </div>

                                {#if file.waitingUsers.length > 0}
                                    <div class="mt-2 text-sm text-gray-600">
                                        Waiting: {file.waitingUsers.map(u => u.name).join(', ')}
                                    </div>
                                {/if}
                            </div>
                        {/each}
                    </div>
                </div>

                <!-- Access History -->
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h2 class="text-xl font-semibold mb-4">Access History</h2>
                    <div class="space-y-2 max-h-48 overflow-y-auto">
                        {#each selectedFile?.accessHistory || [] as record}
                            <div class="p-2 text-sm border-b" transition:slide|local>
                                <span style="color: {record.user.color}">{record.user.name}</span>
                                {record.action} at {record.timestamp.toLocaleTimeString()}
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Notifications -->
    <div class="fixed bottom-4 right-4 space-y-2">
        {#each notifications as notification}
            <div class="bg-white p-4 rounded-lg shadow-lg" 
                 transition:fade>
                {notification.message}
            </div>
        {/each}
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
