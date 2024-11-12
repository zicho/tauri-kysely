<script lang="ts">
	import { type TableRowModel } from '$lib/viewmodels/ListPeopleViewModel';
	import { Trash2, Edit, CircleX } from 'lucide-svelte';

	type TableHeader<T> = {
		name: string;
		property: keyof T;
	};

	type TableProps<T> = {
		headers: TableHeader<T>[];
		data: TableRowModel<T>[];
		primaryKey: keyof T;
		onEdit?: () => T; // Function that receives the primary key value of a row for editing
		onDelete?: (t: T) => void; // Function that receives the primary key value of a row for deletion
		onDeleteMany?: () => T[];
	};

	type T = $$Generic;

	let { data = $bindable(), headers, primaryKey, onDelete }: TableProps<T> = $props();

	let allSelected = $state(false);

	type FilterMap<T> = {
		[K in keyof T]?: K; // Each key is optional and of the same type as the key of T
	};

	let filters: FilterMap<T> = $state({});

	let filteredData = $derived(
		data.filter((row: T) => {
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

		data = data.map((row) => ({
			...row,
			selected: filteredIds.includes(row[primaryKey]) ? !allSelected : row.selected
		}));
	}

	let numSelected = $derived(data.filter((x) => x.selected).length);
	let indeterminate = $derived(numSelected > 0 && numSelected < data.length);
</script>

<div class="flex flex-col">
	<button class="btn btn-error" disabled={numSelected === 0}><Trash2 />Delete selected</button>
	<div class="overflow-x-auto">
		<table class="table table-xs">
			<thead>
				<tr class="px-8">
					<th class="w-10 px-4 py-2">
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
						<th class="px-4 py-2">
							<div class="flex items-center gap-2 w-full">
								<span class="mr-4 text-sm">{header.name}:</span>

								<label class="input input-bordered flex items-center gap-2 w-full h-8 text-xs px-3">
									<input
										type="text"
										class="grow border-none focus:ring-0 px-0 text-xs"
										bind:value={filters[header.property]}
										placeholder={`${header.name}`}
									/>
									<button
										type="button"
										class="text-gray-600 hover:text-gray-900"
										onclick={() => {
											filters[header.property] = '' as keyof T;
										}}
									>
										<CircleX class="w-4 h-4" />
									</button>
								</label>
							</div>
						</th>
					{/each}
					<th class="w-20 px-4 py-2"></th>
					<!-- Fixed width for the action column -->
				</tr>
			</thead>
			<tbody>
				{#each filteredData as row}
					<tr class="hover:bg-gray-100 transition-all">
						<td class="px-4 py-2">
							<label>
								<input type="checkbox" class="checkbox" bind:checked={row.selected} />
							</label>
						</td>
						{#each headers as header}
							<td class="px-4 py-2">{row[header.property]}</td>
						{/each}
						<td class="px-4 py-2 flex justify-end gap-x-4">
							<button class="text-gray-600 hover:text-blue-600">
								<Edit class="w-5 h-5" />
							</button>

							<button
								onclick={() => onDelete && onDelete(row)}
								class="text-error hover:text-red-600"
							>
								<Trash2 class="w-5 h-5" />
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
