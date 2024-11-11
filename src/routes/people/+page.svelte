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
	let allSelected = $state(false);

	let numSelected = $derived(persons.filter((x) => x.selected).length);
	let indeterminate = $derived(numSelected > 0 && numSelected < persons.length);

	let filteredData = $derived(
		persons.filter(
			(x) =>
				x.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				x.last_name?.toLowerCase().includes(searchQuery.toLowerCase())
		)
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

	async function onAllSelectedClick() {
		const filteredIds = filteredData.map((person) => person.id);

		persons = persons.map((person) => ({
			...person,
			selected: filteredIds.includes(person.id) ? !allSelected : person.selected
		}));
	}

	async function deleteRange() {
		const ids = filteredData.filter((x) => x.selected).map((x) => x.id);
		await new PersonRepository().deleteRange({
			ids
		});

		persons = persons.filter((person) => !ids.includes(person.id));
		allSelected = false;
	}
</script>

<div class="flex flex-col">
	<input bind:value={searchQuery} />
	<button class="btn btn-error" disabled={numSelected === 0} onclick={deleteRange}
		><Trash2 />Delete selected</button
	>
	<div class="overflow-x-auto">
		<table class="table table-xs">
			<thead>
				<tr>
					<th>
						<label>
							<input
								type="checkbox"
								class="checkbox"
								{indeterminate}
								bind:checked={allSelected}
								onclick={onAllSelectedClick}
							/>
						</label>
					</th>
					<th>Name</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{#each filteredData as p}
					<tr>
						<th
							><label>
								<input type="checkbox" class="checkbox" bind:checked={p.selected} />
							</label></th
						>
						<td>{p.first_name} {p.last_name}</td>
						<th class="flex justify-end gap-x-8 mr-8"
							><button onclick={() => goto(`/people/edit/${p.id}`)}><Edit /></button>
							<button onclick={() => showDeleteModal(p.id)}><Trash2 class="text-error" /></button
							></th
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
