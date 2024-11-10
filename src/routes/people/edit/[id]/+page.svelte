<script lang="ts">
	import { goto } from '$app/navigation';
	import { PersonRepository } from '$lib/db/repos/PersonRepository';
	import StandardPageLayout from '$lib/layouts/StandardPageLayout.svelte';

	let { data } = $props();
	let { person } = $state(data);

	const onsubmit = async (e: Event) => {
        const result = await new PersonRepository().update({id: person.id, data: person})

        if(result.success) {
            goto("/people")
        }
    };
</script>

<StandardPageLayout title="Edit person">
	<form class="flex flex-col gap-y-4" {onsubmit}>
		<input bind:value={person.first_name} />
		<button class="btn btn-primary" type="submit">Save</button>
	</form>
</StandardPageLayout>
