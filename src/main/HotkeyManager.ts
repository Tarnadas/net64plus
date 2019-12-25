import * as electronLocalshortcut from 'electron-localshortcut'


export class HotkeyManager {
  constructor(private window: Electron.BrowserWindow) {

  }

  private localHotkeyListener: (event: KeyboardEvent) => any = () => {}

  public setHotkeys(hotkeyBindings: { [characterId: number]: string | undefined }, globalHotkeysEnabled: boolean) {
    this.setLocalHotkeys(globalHotkeysEnabled ? {} : hotkeyBindings)
    this.setGlobalHotkeys(globalHotkeysEnabled ? hotkeyBindings : {})
  }

  private setLocalHotkeys(hotkeyBindings: { [characterId: number]: string | undefined }) {
    electronLocalshortcut.unregisterAll(this.window)
    Object.entries(hotkeyBindings).forEach(([characterId, hotkey]) => {
      if (!!hotkey) {
        electronLocalshortcut.register(this.window, hotkey, () => {
          console.log(characterId)
        })
      }
    })
  }

  private setGlobalHotkeys(hotkeyBindings: { [characterId: number]: string | undefined }) {

  }
}
