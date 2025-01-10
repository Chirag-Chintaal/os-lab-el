<script>
    import { goto } from '$app/navigation';
    import { slide } from 'svelte/transition';
    
    let treeData = {
        name: 'root',
        type: 'folder',
        children: [
            {
                name: 'home',
                type: 'folder',
                children: [
                    {
                        name: 'user1',
                        type: 'folder',
                        children: [
                            { name: 'documents', type: 'folder', children: [
                                { name: 'thesis.pdf', type: 'file', children: [] },
                                { name: 'notes.txt', type: 'file', children: [] }
                            ]},
                            { name: 'downloads', type: 'folder', children: [] }
                        ]
                    }
                ]
            },
            {
                name: 'etc',
                type: 'folder',
                children: [
                    { name: 'config.txt', type: 'file', children: [] }
                ]
            }
        ]
    };

    let expandedNodes = new Set();
    let selectedNode = null;

    function toggleNode(node) {
        if (node.type === 'folder') {
            if (expandedNodes.has(node)) {
                expandedNodes.delete(node);
            } else {
                expandedNodes.add(node);
            }
            expandedNodes = expandedNodes;
        }
        selectedNode = node;
    }

    function getIcon(node) {
        if (node.type === 'file') {
            const extension = node.name.split('.').pop();
            switch(extension) {
                case 'pdf': return '📄';
                case 'txt': return '📝';
                default: return '📄';
            }
        }
        return expandedNodes.has(node) ? '📂' : '📁';
    }
</script>

<div class="min-h-screen bg-gradient-to-r from-blue-50 via-green-50 to-emerald-50 p-8">
    <button
        on:click={() => goto('/concepts')}
        class="mb-8 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
    >
        Back to Concepts
    </button>

    <div class="max-w-6xl mx-auto">
        <h1 class="text-4xl font-bold text-green-800 mb-6">Directory Structures</h1>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Interactive Tree Section -->
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h2 class="text-2xl font-semibold text-green-700 mb-4">Interactive File System</h2>
                <div class="directory-tree bg-gray-50 p-4 rounded-lg min-h-[400px]">
                    {#each [treeData] as node}
                        <div class="tree-node">
                            <div
                                class="node-content {node.type === 'folder' ? 'has-children' : ''} {selectedNode === node ? 'selected' : ''}"
                                on:click={() => toggleNode(node)}
                            >
                                <span class="icon">{getIcon(node)}</span>
                                <span class="name">{node.name}</span>
                            </div>
                            
                            {#if expandedNodes.has(node) && node.children}
                                <div class="children" transition:slide>
                                    {#each node.children as child}
                                        <div class="tree-node" style="margin-left: 20px;">
                                            <div
                                                class="node-content {child.type === 'folder' ? 'has-children' : ''} {selectedNode === child ? 'selected' : ''}"
                                                on:click={() => toggleNode(child)}
                                            >
                                                <span class="icon">{getIcon(child)}</span>
                                                <span class="name">{child.name}</span>
                                            </div>
                                            
                                            {#if expandedNodes.has(child) && child.children}
                                                <div class="children" transition:slide>
                                                    {#each child.children as grandChild}
                                                        <div class="tree-node" style="margin-left: 20px;">
                                                            <!-- Recursively render grandchildren -->
                                                            <div
                                                                class="node-content {grandChild.type === 'folder' ? 'has-children' : ''} {selectedNode === grandChild ? 'selected' : ''}"
                                                                on:click={() => toggleNode(grandChild)}
                                                            >
                                                                <span class="icon">{getIcon(grandChild)}</span>
                                                                <span class="name">{grandChild.name}</span>
                                                            </div>
                                                            
                                                            {#if expandedNodes.has(grandChild) && grandChild.children}
                                                                <div class="children" transition:slide>
                                                                    {#each grandChild.children as greatGrandChild}
                                                                        <div class="tree-node" style="margin-left: 20px;">
                                                                            <div
                                                                                class="node-content {selectedNode === greatGrandChild ? 'selected' : ''}"
                                                                                on:click={() => toggleNode(greatGrandChild)}
                                                                            >
                                                                                <span class="icon">{getIcon(greatGrandChild)}</span>
                                                                                <span class="name">{greatGrandChild.name}</span>
                                                                            </div>
                                                                        </div>
                                                                    {/each}
                                                                </div>
                                                            {/if}
                                                        </div>
                                                    {/each}
                                                </div>
                                            {/if}
                                        </div>
                                    {/each}
                                </div>
                            {/if}
                        </div>
                    {/each}
                </div>
                <div class="mt-4 text-sm text-gray-600">
                    <p>🔍 Click on folders to expand/collapse</p>
                    <p>📁 Folders can contain other folders and files</p>
                    <p>📄 Files are leaf nodes (no children)</p>
                </div>
            </div>

            <!-- Explanation Section -->
            <div class="bg-white rounded-xl shadow-lg p-6 space-y-6">
                <h2 class="text-2xl font-semibold text-green-700">Directory Structure Types</h2>
                
                <div transition:slide>
                    <h3 class="text-xl font-semibold text-green-600 mb-2">Single-Level Directory</h3>
                    <div class="bg-gray-50 p-4 rounded-lg mb-2">
                        <pre class="text-sm">root/
├── file1.txt
├── file2.txt
└── file3.txt</pre>
                    </div>
                    <p class="text-gray-700 text-sm">All files in one directory. Simple but very limited.</p>
                </div>

                <div transition:slide>
                    <h3 class="text-xl font-semibold text-green-600 mb-2">Two-Level Directory</h3>
                    <div class="bg-gray-50 p-4 rounded-lg mb-2">
                        <pre class="text-sm">root/
├── user1/
│   ├── file1.txt
│   └── file2.txt
└── user2/
    └── file3.txt</pre>
                    </div>
                    <p class="text-gray-700 text-sm">Separate directory for each user. Better organization but still limited.</p>
                </div>

                <div transition:slide>
                    <h3 class="text-xl font-semibold text-green-600 mb-2">Hierarchical Directory</h3>
                    <div class="bg-gray-50 p-4 rounded-lg mb-2">
                        <pre class="text-sm">root/
├── home/
│   └── user1/
│       ├── docs/
│       └── downloads/
└── etc/
    └── config/</pre>
                    </div>
                    <p class="text-gray-700 text-sm">Tree-structured directories. Most common in modern systems.</p>
                </div>

                <div transition:slide>
                    <h3 class="text-xl font-semibold text-green-600 mb-2">Acyclic-Graph Directory</h3>
                    <div class="bg-gray-50 p-4 rounded-lg mb-2">
                        <pre class="text-sm">root/
├── projects/
│   └── shared/ ─┐
└── users/       │
    └── user1/ ──┘</pre>
                    </div>
                    <p class="text-gray-700 text-sm">Allows links between directories while preventing cycles.</p>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .directory-tree {
        font-family: 'Fira Code', monospace;
        font-size: 1.1em;
    }

    .tree-node {
        margin: 4px 0;
    }

    .node-content {
        display: flex;
        align-items: center;
        padding: 4px 8px;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .node-content:hover {
        background-color: rgba(0, 0, 0, 0.05);
        transform: translateX(4px);
    }

    .node-content.selected {
        background-color: rgba(0, 200, 0, 0.1);
        border: 1px solid rgba(0, 200, 0, 0.2);
    }

    .has-children {
        font-weight: 500;
        color: #2563eb;
    }

    .icon {
        margin-right: 8px;
        width: 24px;
    }

    .name {
        font-family: 'Fira Code', monospace;
    }

    .children {
        margin-left: 20px;
    }

    pre {
        overflow-x: auto;
        white-space: pre;
        word-wrap: normal;
    }
</style>
