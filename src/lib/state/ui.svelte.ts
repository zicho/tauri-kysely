import { PageTypes, type PageType } from '$lib/types';
import { getContext, hasContext, setContext } from 'svelte';

type AppUiState = {
  pageTitle: string;
}

export class UIState {
  pageTitle = $state<string>('');

  constructor(initialState: AppUiState = { pageTitle: "App" }) {
    this.pageTitle = initialState.pageTitle;
  }

  setPageTitle(pageTitle: string) {
    this.pageTitle = pageTitle;
  }

  getPageTitle() {
    return this.pageTitle;
  }
}

const UI_STATE_KEY = Symbol('UI_STATE');

export function setUiState(initialState: AppUiState) {
  const state = new UIState(initialState);
  setContext(UI_STATE_KEY, state);
  return state;
}

export function getUiState() {
  return getContext<UIState>(UI_STATE_KEY);
}
