<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { User, House, List, UserPlus } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	let open = $state(false);

	onNavigate(() => {
		open = false;
	});
</script>

<div class="drawer lg:drawer-open">
	<input id="my-drawer" type="checkbox" class="drawer-toggle" bind:checked={open} />

	<div class="drawer-content">
		{@render children()}
	</div>

	<div class="drawer-side">
		<label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
    
		<ul class="menu bg-base-200 text-base-content min-h-full w-80 p-0">
      <h2 class="menu-title flex px-4 items-center text-secondary text-lg">App</h2>
      <li>
				<a class="px-6" href="/" class:active={$page.url.pathname === "/"}><House/> Home</a>
			</li>
			<li>
				<h2 class="menu-title flex px-3 items-center text-secondary">
					<User class="mr-2"/>People
				</h2>
				<a class="px-6" href="/people/" class:active={$page.url.pathname === "/people"} ><List />List</a>
				<a class="px-6" href="/people/create" class:active={$page.url.pathname === "/people/create"} ><UserPlus /> Create</a>
			</li>
		</ul>
	</div>
</div>
