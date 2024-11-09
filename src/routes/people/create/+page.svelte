<script lang="ts">
	import { goto } from '$app/navigation';
	import { PersonRepository } from '$lib/db/repos/PersonRepository';
	import { type NewPerson } from '$lib/db/schema/schema';
	import ModalHelper from '$lib/helpers/ModalHelper';
	import StandardPageLayout from '$lib/layouts/StandardPageLayout.svelte';

	let person = $state<NewPerson>({
		first_name: '',
		gender: 'man'
	});

	const onsubmit = async (e: Event) => {
		e.preventDefault();
		if (!person) return;

		let result = await PersonRepository.create({ person });

		if (result.success) {
			ModalHelper.confirmDialog({
				message: 'New person was created. Go to list?',
				confirmAction: () => goto('/people')
			});

			person = {
				first_name: '',
				gender: 'man'
			};
		} else {
			ModalHelper.messageDialog({ title: 'Uh-oh', message: 'Failed to create new person.' });
		}
	};
</script>

<StandardPageLayout title="Create">
	<form action="post" {onsubmit}>
		<input bind:value={person.first_name} />
		<button type="submit">Create</button>
	</form>
</StandardPageLayout>
