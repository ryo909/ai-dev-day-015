# Day015 Story — Constraint Roulette

## Why
毎日使う小さな課題を、1ページで即解決できる形にしたかったため。

## Requirements
- Webブラウザだけで完結すること
- 1画面で主要操作が終わること
- GitHub Pagesで公開できること

## Design highlights
- Day015専用にテーマをseed固定して再生成時の見た目を安定化
- fun用途に寄せた単機能UIで迷いを減らす
- 出力をそのまま再利用できるテキスト構造
- Family: roulette_challenge
- Mechanic: random_spin
- Input/Output: preset_pool -> roulette_result
- Audience Promise: high_short_burst_engagement
- Publish Hook: 回すたびに制約ミッションが変わる
- Complexity Tier: small
- Selected components: none
- Complexity hint: Keep the tool single-purpose and stable. Add at most one safe enhancement component.

## Trade-offs / Known issues
- ローカル保存機能は未実装
- 複雑な入力バリデーションは最小限

## Next ideas
- 履歴保存
- プリセット追加
- エクスポート形式拡張

## Social copy
Day015｜Constraint Roulette
制約ミッションをルーレットで引いて遊ぶチャレンジゲーム。（話題:HN Frontpage）
