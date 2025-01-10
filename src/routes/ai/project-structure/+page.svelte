<script>
    import { onMount } from 'svelte';
    
    let projectDescription = '';
    let loading = false;
    let fileStructure = null;
    let error = null;

    const systemPrompt = `You are a helpful assistant that generates file directory structures for software projects. 
    Given a project description, create a detailed file structure including common configuration files, 
    source files, and test files. Return the response in a JSON format with file paths and brief descriptions.`;

    async function generateStructure() {
        loading = true;
        error = null;
        
        try {
            const response = await fetch('/api/openai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: `Create a file structure for: ${projectDescription}` }
                    ]
                })
            });

            if (!response.ok) throw new Error('Failed to generate structure');
            
            const data = await response.json();
            fileStructure = JSON.parse(data.content);
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        }
    }
</script>

<div class="max-w-4xl mx-auto p-6">
    <h1 class="text-3xl font-bold text-blue-900 mb-6">Project Structure Generator</h1>

    <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
        <textarea
            bind:value={projectDescription}
            placeholder="Describe your project (e.g., 'A React web app for managing todo lists with user authentication')"
            class="w-full h-32 p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
        ></textarea>

        <button
            on:click={generateStructure}
            disabled={loading || !projectDescription}
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                   disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
            {loading ? 'Generating...' : 'Generate Structure'}
        </button>
    </div>

    {#if error}
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
        </div>
    {/if}

    {#if fileStructure}
        <div class="bg-white rounded-lg shadow-lg p-6">
            <h2 class="text-xl font-semibold mb-4">Generated File Structure</h2>
            <div class="font-mono text-sm">
                {#each Object.entries(fileStructure) as [path, description]}
                    <div class="mb-2">
                        <div class="text-blue-600">{path}</div>
                        <div class="pl-4 text-gray-600">{description}</div>
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</div>
