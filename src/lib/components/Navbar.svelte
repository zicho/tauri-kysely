<script>
	import { getUiState } from "$lib/state/ui.svelte";
	import { Ellipsis, Menu } from "lucide-svelte";

  const uiState = getUiState();
  
  console.dir(uiState.pageTitle)
</script>

<div class="navbar bg-secondary text-secondary-content lg:hidden no-hover-effects">
	<div class="flex-none">
		<label for="my-drawer" class="btn btn-square btn-ghost">
			<Menu />
		</label>
	</div>
	<div class="flex-1">
		<span class="btn btn-ghost text-xl bg-inherit">{uiState.pageTitle}</span>
	</div>
	<div class="flex-none">
		<button class="btn btn-square btn-ghost" aria-label="menu-button">
			<Ellipsis />
		</button>
	</div>
</div>

<style>
	.menu a.active {
		@apply bg-base-300 text-base-content rounded-none;
	}

	.no-hover-effects :is(:hover, :focus) {
		@apply bg-inherit;
	}
</style>