<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { setUiState } from '$lib/state/ui.svelte';
	import '../app.css';
	let { children } = $props();

	setUiState({ pageTitle: 'App' });
</script>

<Navbar />

<Sidebar>
	{@render children()}
</Sidebar>
