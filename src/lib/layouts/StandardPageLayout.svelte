<script lang="ts">
	import { getUiState } from '$lib/state/ui.svelte';
	import type { Snippet } from 'svelte';

	let { children, title }: { children: Snippet; title: string } = $props();

	getUiState().setPageTitle(title);
</script>

<div class="flex flex-col prose lg:prose-xl p-4 max-w-none">
	{@render children?.()}
</div>
