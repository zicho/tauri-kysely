<script lang="ts">
	import Table from '$lib/components/table/Table.svelte';
	import { PersonRepository } from '$lib/db/repos/PersonRepository.js';
	import type { Person } from '$lib/db/schema/schema.js';
	import ModalHelper from '$lib/helpers/ModalHelper';
	import { getUiState } from '$lib/state/ui.svelte.js';
	import type { TableRowModel } from '$lib/viewmodels/ListPeopleViewModel.js';

	const uiState = getUiState();
	uiState.setPageTitle('People');

	let { data } = $props();
	let { persons } = $state(data);

	// async function onDelete(id: number) {
	// 	ModalHelper.confirmDialog({
	// 		message: 'Delete person?',
	// 		confirmAction: () => confirmDelete(id)
	// 	});
	// }

	async function onDelete(p: Person) {
		const result = await new PersonRepository().delete({ id: p.id });

		console.dir(p.id)

		if (result.success) {
			console.log("length:", persons.length)
			console.log("id deleted", p.id)
			
			persons = persons.filter((person) => person.id !== p.id);
			console.log("length:", persons.length)
			
			ModalHelper.messageDialog({ message: 'Person was deleted!' });
		} else {
			ModalHelper.messageDialog({ message: 'Person was not deleted due to error' });
		}
	}

	async function deleteRange() {
		const ids = persons.filter((x) => x.selected).map((x) => x.id);
		await new PersonRepository().deleteRange({
			ids
		});

		persons = persons.filter((person) => !ids.includes(person.id));
	}
</script>

<Table
	primaryKey="id"
	bind:data={persons}
	headers={[
		{
			name: 'Name',
			property: 'first_name'
		},
		{
			name: 'Gender',
			property: 'gender'
		}
	]}
	{onDelete}
/>

<!-- <div class="flex flex-col">
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
					<th>Name <input bind:value={searchQuery} /></th>
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
</div> -->
