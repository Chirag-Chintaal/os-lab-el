
<script>
	// ...existing code...
</script>

<style>
	/* You can add additional styles here if necessary */
</style>

<div class="min-h-screen flex flex-col bg-gray-100">
	<!-- Navigation Bar -->
	<nav class="sticky top-0 bg-white shadow-md">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between h-16">
				<div class="flex space-x-4">
					<a href="/" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Home</a>
					<a href="/concepts" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Concepts</a>
					<a href="/simulation" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Simulation</a>
					<a href="/quizzes" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Quizzes</a>
					<a href="/resources" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Resources</a>
				</div>
			</div>
		</div>
	</nav>

	<!-- Main Content -->
	<main class="flex-grow">
		<!-- ...existing code... -->
		<slot></slot>
	</main>

	<!-- Footer -->
	<footer class="bg-gray-200">
		<div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
				<div>
					<h3 class="text-gray-700 font-semibold mb-4">About</h3>
					<ul class="space-y-2">
						<li><a href="/about" class="text-gray-600 hover:text-gray-800">Our Story</a></li>
						<li><a href="/team" class="text-gray-600 hover:text-gray-800">Team</a></li>
						<li><a href="/careers" class="text-gray-600 hover:text-gray-800">Careers</a></li>
					</ul>
				</div>
				<div>
					<h3 class="text-gray-700 font-semibold mb-4">Resources</h3>
					<ul class="space-y-2">
						<li><a href="/docs" class="text-gray-600 hover:text-gray-800">Documentation</a></li>
						<li><a href="/tutorials" class="text-gray-600 hover:text-gray-800">Tutorials</a></li>
						<li><a href="/blog" class="text-gray-600 hover:text-gray-800">Blog</a></li>
					</ul>
				</div>
				<div>
					<h3 class="text-gray-700 font-semibold mb-4">Contact</h3>
					<ul class="space-y-2">
						<li><a href="/contact" class="text-gray-600 hover:text-gray-800">Contact Us</a></li>
						<li><a href="/support" class="text-gray-600 hover:text-gray-800">Support</a></li>
						<li><a href="/faq" class="text-gray-600 hover:text-gray-800">FAQ</a></li>
					</ul>
				</div>
			</div>
		</div>
	</footer>
</div>