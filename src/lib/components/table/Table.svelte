<script lang="ts">
	import { TableRowModelMapper } from '$lib/viewmodels/ListPeopleViewModel';
	import { Trash2, Edit } from 'lucide-svelte';

	type TableHeader<T> = {
		name: string;
		property: keyof T;
	};

	type TableProps<T> = {
		headers: TableHeader<T>[];
		data: T[];
		primaryKey: keyof T;
	};

	type T = $$Generic;

	let { data, headers, primaryKey }: TableProps<T> = $props();

	let tableData = $state(TableRowModelMapper.map(data));

	let allSelected = $state(false);

	type FilterMap<T> = {
		[K in keyof T]?: K; // Each key is optional and of the same type as the key of T
	};

	let filters: FilterMap<T> = $state({});

	let filteredData = $derived(
		tableData.filter((row: T) => {
			return Object.keys(filters).every((key) => {
				const typedKey = key as keyof T; // Cast key to keyof T
				if (!filters[typedKey]) return true; // If no filter is set, don't filter
				return String(row[typedKey])
					.toLowerCase()
					.includes(String(filters[typedKey])?.toLowerCase() ?? ''); // Add fallback for undefined filters
			});
		})
	);

	async function onAllSelectedClick() {
		const filteredIds = filteredData.map((row) => row[primaryKey]);

		tableData = tableData.map((row) => ({
			...row,
			selected: filteredIds.includes(row[primaryKey]) ? !allSelected : row.selected
		}));
	}

	let numSelected = $derived(tableData.filter((x) => x.selected).length);
	let indeterminate = $derived(numSelected > 0 && numSelected < tableData.length);
</script>

<div class="flex flex-col">
	<button class="btn btn-error" disabled={numSelected === 0}><Trash2 />Delete selected</button>
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
					{#each headers as header}
						<th>
							<span class="mr-4">{header.name}:</span>

							<input
								type="text"
								class="input input-bordered w-full max-w-xs text-xs max-h-8 px-2"
								bind:value={filters[header.property]}
								placeholder={`${header.name}`}
							/>
						</th>
					{/each}
					<th></th>
				</tr>
			</thead>
			<tbody>
				{#each filteredData as row}
					<tr>
						<th
							><label>
								<input type="checkbox" class="checkbox" bind:checked={row.selected} />
							</label></th
						>
						{#each headers as header}
							<td>{row[header.property]}</td>
						{/each}
						<th class="flex justify-end gap-x-8 mr-8"
							><button><Edit /></button>
							<button><Trash2 class="text-error" /></button></th
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
