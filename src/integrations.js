export class FirebaseBridge {
  constructor(storageKey) {
    this.storageKey = storageKey;
    this.online = false;
  }

  async submitLeaderboard(entry) {
    const key = `${this.storageKey}:leaderboard`;
    const saved = JSON.parse(localStorage.getItem(key) || "[]");
    const updated = [...saved, entry].sort((a, b) => b.score - a.score).slice(0, 20);
    localStorage.setItem(key, JSON.stringify(updated));
    return updated;
  }

  async loadLeaderboard(defaultRows = []) {
    const key = `${this.storageKey}:leaderboard`;
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(defaultRows));
  }

  async syncProgress(progress) {
    localStorage.setItem(`${this.storageKey}:cloudShadow`, JSON.stringify({ ...progress, syncedAt: Date.now() }));
    return { ok: true, provider: "offline-local" };
  }
}

export class AdMobBridge {
  constructor() {
    this.ready = false;
  }

  async showRewardedAd(reason) {
    return { rewarded: true, reason, provider: "offline-test-ad" };
  }
}
