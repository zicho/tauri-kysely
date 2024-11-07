<script lang="ts">
	import { GlobalState, preventDefault } from '$lib';
	import { db } from '$lib/db/kysely';
	import { createPerson } from '$lib/db/repos/personRepository';
	const gs = new GlobalState();

	$inspect(gs.greet, gs.name);

	const onsubmit = preventDefault(() => gs.nlen && gs.submit());
	const onclick = () => gs.reset();

	const add = async () => {
		await createPerson({
			first_name: 'Martin', gender: "man", metadata: "test"
		});
	};
</script>

<div class="p-6 gap-y-4 flex flex-col max-w-md bg-base-100 text-base-content">
	<!-- Button -->
	<button class="btn btn-primary" onclick={add}>Primary Button</button>
	<button class="btn btn-secondary">Secondary Button</button>
	<button class="btn btn-accent">Accent Button</button>

	<!-- Alert -->
	<div class="alert alert-info">
		<span class="text-info-content">This is an info alert!</span>
	</div>
	<div class="alert alert-success">
		<span class="text-success-content">This is a success alert!</span>
	</div>
	<div class="alert alert-warning">
		<span class="text-warning-content">This is a warning alert!</span>
	</div>
	<div class="alert alert-error">
		<span class="text-error-content">This is an error alert!</span>
	</div>

	<!-- Card -->
	<div class="card w-96 bg-neutral text-neutral-content shadow-xl">
		<div class="card-body p-4">
			<h2 class="card-title">Neutral Card</h2>
			<p>This card uses the neutral color scheme.</p>
			<div class="card-actions justify-end">
				<button class="btn btn-secondary">Learn More</button>
			</div>
		</div>
	</div>

	<!-- Badge -->
	<div>
		<span class="badge badge-primary">Primary Badge</span>
		<span class="badge badge-secondary">Secondary Badge</span>
		<span class="badge badge-accent">Accent Badge</span>
		<span class="badge badge-info">Info Badge</span>
		<span class="badge badge-success">Success Badge</span>
		<span class="badge badge-warning">Warning Badge</span>
		<span class="badge badge-error">Error Badge</span>
	</div>

	<!-- Pro gress Bar -->
	<div class="space-y-2">
		<progress class="progress progress-primary w-56" value="70" max="100"></progress>
		<progress class="progress progress-secondary w-56" value="50" max="100"></progress>
		<progress class="progress progress-accent w-56" value="90" max="100"></progress>
	</div>
</div>
