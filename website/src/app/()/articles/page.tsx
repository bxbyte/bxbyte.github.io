import { articleInfos, articleTags } from '@/lib/articles'

import Client from './client'

export default function ArticleSearchPage() {
	return <Client articleInfos={articleInfos} articleTags={articleTags} />
}
