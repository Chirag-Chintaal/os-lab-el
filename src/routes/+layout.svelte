<script>
    import '../app.css';
</script>

<div class="min-h-screen">
    <!-- Top Bar -->
    <div class="fixed top-0 left-0 right-0 bg-blue-900 text-white px-4 py-2 flex justify-between items-center z-50 shadow-lg">
        <div class="flex space-x-8">
            <div class="relative group">
                <span class="cursor-pointer hover:text-blue-200 transition-colors">
                    CHIRAG CHINTAAL 1RV23CS076
                </span>
                <div class="absolute hidden group-hover:block top-full left-0 mt-1 w-64 bg-white text-gray-800 rounded-lg shadow-xl p-4">
                    <div class="text-sm space-y-2">
                        <h3 class="font-bold text-blue-900">Chirag Chintaal</h3>
                        <p>USN: 1RV23CS076</p>
                        <p>Computer Science & Engineering</p>
                        <p>RV College of Engineering</p>
                    </div>
                </div>
            </div>

            <div class="relative group">
                <span class="cursor-pointer hover:text-blue-200 transition-colors">
                    CHETAN M PATIL 1RV23CS074
                </span>
                <div class="absolute hidden group-hover:block top-full left-0 mt-1 w-64 bg-white text-gray-800 rounded-lg shadow-xl p-4">
                    <div class="text-sm space-y-2">
                        <h3 class="font-bold text-blue-900">Chetan M Patil</h3>
                        <p>USN: 1RV23CS074</p>
                        <p>Computer Science & Engineering</p>
                        <p>RV College of Engineering</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="text-right">
            <span class="font-semibold">Professor Dr. VEENA GADAD</span>
        </div>
    </div>

    <!-- Main Content with padding for top bar -->
    <div class="pt-16">
        <slot />
    </div>
</div>

<style>
    /* Smooth hover transitions */
    .group:hover > div {
        display: block;
        animation: fadeIn 0.2s ease-in-out;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
</style>
