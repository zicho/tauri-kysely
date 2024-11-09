import { PersonRepository } from '$lib/db/repos/PersonRepository';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({params}) => {

    const getPerson = await PersonRepository.getById({id: Number(params.id)})

    if(!getPerson.success) {
        error(500)
    }

    return {
        person: getPerson.result!
    };
}) satisfies PageLoad;