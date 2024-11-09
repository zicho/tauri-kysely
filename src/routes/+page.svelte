<script>
	import ModalHelper from '$lib/helpers/ModalHelper';
	import StandardPageLayout from '$lib/layouts/StandardPageLayout.svelte';

	async function onclick() {
		ModalHelper.messageDialog({
			message: 'I am a system modal'
		});
	}
</script>

<StandardPageLayout title="Home">
	<h1>Hejsan</h1>
	<button class="btn btn-primary" {onclick}>Test</button>
</StandardPageLayout>
