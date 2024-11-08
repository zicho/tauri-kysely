import { ask, message as msg } from '@tauri-apps/plugin-dialog';

type MessageParams = {
	title?: string;
	message: string;
};

type ConfirmActionParams = MessageParams & {
	confirmAction: () => void;
	cancelAction?: () => void;
};

class ModalHelper {
	static async confirmDialog({
		title = 'Confirm', // Set default title for confirmDialog
		message,
		confirmAction,
		cancelAction = () => {}
	}: ConfirmActionParams): Promise<void> {
		const confirmed = await ask(message, { title, kind: 'warning' });
		if (confirmed) {
			confirmAction();
		} else {
			cancelAction();
		}
	}

	static async messageDialog({
		title = 'Message', // Set default title for messageDialog
		message
	}: MessageParams): Promise<void> {
		await msg(message, { title, kind: 'info' });
	}
}

export default ModalHelper;