<script lang="ts">
	import { goto } from '$app/navigation';
	import { PersonRepository } from '$lib/db/repos/PersonRepository.js';
	import ModalHelper from '$lib/helpers/ModalHelper';
	import StandardPageLayout from '$lib/layouts/StandardPageLayout.svelte';
	import { getUiState } from '$lib/state/ui.svelte.js';
	import { Edit, Trash2 } from 'lucide-svelte';

	const uiState = getUiState();
	uiState.setPageTitle('People');

	let { data } = $props();
	let { persons } = $state(data);
	let searchQuery = $state('');

	const filteredData = $derived(
		persons.filter((x) => x.first_name.toLowerCase().includes(searchQuery.toLowerCase()))
	);

	async function showDeleteModal(id: number) {
		ModalHelper.confirmDialog({
			message: 'Delete person?',
			confirmAction: () => confirmDelete(id)
		});
	}

	async function confirmDelete(id: number) {
		const result = await new PersonRepository().delete({ id });

		if (result.success) {
			persons = persons.filter((person) => person.id !== id);
			ModalHelper.messageDialog({ message: 'Person was deleted!' });
		} else {
			ModalHelper.messageDialog({ message: 'Person was not deleted due to error' });
		}
	}
</script>

<StandardPageLayout title="People">
	<input bind:value={searchQuery} />
	<table class="table">
		<!-- head -->
		<thead>
			<tr>
				<th></th>
				<th>Name</th>
				<th>Gender</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			{#each filteredData as p}
				<tr>
					<th>{p.id}</th>
					<td>{p.first_name} {p.last_name}</td>
					<td>{p.gender}</td>
					<td class="flex justify-end gap-x-8 mr-8"
						><button onclick={() => goto(`/people/edit/${p.id}`)}><Edit /></button>
						<button onclick={() => showDeleteModal(p.id)}><Trash2 class="text-error" /></button></td
					>
				</tr>
			{/each}
		</tbody>
	</table>
</StandardPageLayout>
