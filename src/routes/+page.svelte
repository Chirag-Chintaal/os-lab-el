<script>
	// Importing Svelte's navigation function
	import { goto } from '$app/navigation';
</script>

<div class="min-h-screen bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 text-gray-900 font-sans">
	<!-- Hero Section -->
	<section class="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-b from-blue-100 to-blue-50">
		<h1 class="text-4xl md:text-6xl font-extrabold mb-4 text-blue-900">File Systems Demystified</h1>
		<p class="text-lg md:text-xl text-gray-700 mb-6">
			Interactive, Reactive, Comprehensive
		</p>
		<button
			on:click={() => goto('/concepts')}
			class="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white text-lg font-medium rounded-full hover:from-purple-600 hover:to-blue-700 shadow-xl transition-transform transform hover:scale-105"
		>
			Get Started
		</button>
	</section>

	<!-- Features Section -->
	<section class="py-16 px-4 md:px-16">
		<h2 class="text-3xl font-bold text-center mb-12 text-purple-800">Explore File Systems Concepts</h2>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			<!-- Card 1: File Allocation -->
			<div
				class="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow transform hover:scale-105 cursor-pointer"
				on:click={() => goto('/concepts/file_allocation')}
			>
				<h3 class="text-xl font-bold mb-4 text-yellow-800">File Allocation</h3>
				<p class="text-gray-700">
					Learn how files are stored on disk using various allocation methods like contiguous, linked, and indexed.
				</p>
			</div>

			<!-- Card 2: Directory Structures -->
			<div
				class="bg-gradient-to-br from-green-100 to-green-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow transform hover:scale-105 cursor-pointer"
				on:click={() => goto('/concepts/directory_structures')}
			>
				<h3 class="text-xl font-bold mb-4 text-green-800">Directory Structures</h3>
				<p class="text-gray-700">
					Explore hierarchical, flat, and graph-based directory structures in modern file systems.
				</p>
			</div>

			<!-- Card 3: File Metadata -->
			<div
				class="bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow transform hover:scale-105 cursor-pointer"
				on:click={() => goto('/concepts/file_metadata')}
			>
				<h3 class="text-xl font-bold mb-4 text-pink-800">File Metadata</h3>
				<p class="text-gray-700">
					Understand the critical information stored about files, including permissions, timestamps, and ownership.
				</p>
			</div>
		</div>
	</section>
</div>
