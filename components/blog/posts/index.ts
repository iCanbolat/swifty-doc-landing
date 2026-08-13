import type { BlogPost } from "../types"

import { companyFormationAgentsPost } from "./document-collection-for-uk-company-formation-agents"
import { immigrationAdvisersPost } from "./document-collection-for-uk-immigration-advisers"
import { rdTaxCreditSpecialistsPost } from "./document-collection-for-rd-tax-credit-specialists"
import { specialistFinanceBrokersPost } from "./document-collection-for-specialist-finance-brokers"

/** Newest first — this is the order the listing page renders. */
export const BLOG_POSTS: BlogPost[] = [
  immigrationAdvisersPost,
  specialistFinanceBrokersPost,
  rdTaxCreditSpecialistsPost,
  companyFormationAgentsPost,
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug)
}
