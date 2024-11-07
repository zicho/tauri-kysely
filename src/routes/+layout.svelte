<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="navbar bg-secondary text-secondary-content lg:hidden no-hover-effects">
	<div class="flex-none">
		<label for="my-drawer" class="btn btn-square btn-ghost">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="inline-block h-5 w-5 stroke-current"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h16"
				></path>
			</svg>
		</label>
	</div>
	<div class="flex-1"> 
		<span class="btn btn-ghost text-xl  bg-inherit ">App</span>
	</div>
	<div class="flex-none">
		<button class="btn btn-square btn-ghost" aria-label="menu-button">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="inline-block h-5 w-5 stroke-current"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
				></path>
			</svg>
		</button>
	</div>
</div>
<div class="drawer lg:drawer-open">
	<input id="my-drawer" type="checkbox" class="drawer-toggle" />

	<div class="drawer-content">
		{@render children()}
	</div>
	<div class="drawer-side">
		<label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
		<ul class="menu bg-base-200 text-base-content min-h-full w-80 p-0 text-xl">
			<!-- Sidebar content here -->
			<li class="active"><a href="/" class="active">Sidebar Item 1</a></li>
			<li><a href="/">Sidebar Item 2</a></li>
		</ul>
	</div>
</div>

<style>
	.menu a.active {
		@apply bg-base-300 text-base-content rounded-none;
	}

	.no-hover-effects :is(:hover, :focus) {
		@apply bg-inherit 
    ;
	}
</style>
