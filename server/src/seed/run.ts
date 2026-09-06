/* eslint-disable no-console */
import { connectDatabase, disconnectDatabase } from '../config/db.js';
import {
  Person,
  Education,
  Experience,
  ResearchInterest,
  Publication,
  Presentation,
  Achievement,
  AcademicProfile,
  ContactInformation,
  MediaAsset,
} from '../models/index.js';
import {
  personSeed,
  experienceSeed,
  researchInterestsSeed,
  publicationsSeed,
  academicProfilesSeed,
  contactInformationSeed,
  educationSeed,
  presentationsSeed,
  achievementsSeed,
  mediaAssetsSeed,
} from './data.js';

/**
 * Idempotent seed script. Safe to re-run: singleton documents are
 * upserted, and collection-based records are upserted by a natural
 * unique key (title+year for publications, network for profiles, etc.)
 * rather than being wiped and recreated, so re-seeding never duplicates
 * data or clobbers content added later through the admin API.
 */
async function seed(): Promise<void> {
  await connectDatabase();

  console.log(`[seed] Upserting ${mediaAssetsSeed.length} media asset(s)...`);
  let profileImageId: unknown = null;
  for (const item of mediaAssetsSeed) {
    const doc = await MediaAsset.findOneAndUpdate({ slug: item.slug }, item, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
    if (item.kind === 'profile-photo') profileImageId = doc._id;
  }

  console.log('[seed] Upserting Person...');
  await Person.findOneAndUpdate(
    {},
    { ...personSeed, ...(profileImageId ? { profileImage: profileImageId } : {}) },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  console.log('[seed] Upserting ContactInformation...');
  await ContactInformation.findOneAndUpdate({}, contactInformationSeed, {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  });

  console.log(`[seed] Upserting ${researchInterestsSeed.length} research interests...`);
  for (const item of researchInterestsSeed) {
    await ResearchInterest.findOneAndUpdate({ name: item.name }, item, {
      upsert: true,
      setDefaultsOnInsert: true,
    });
  }

  console.log(`[seed] Upserting ${experienceSeed.length} experience record(s)...`);
  for (const item of experienceSeed) {
    await Experience.findOneAndUpdate(
      { role: item.role, organization: item.organization },
      item,
      { upsert: true, setDefaultsOnInsert: true }
    );
  }

  console.log(`[seed] Upserting ${publicationsSeed.length} publications...`);
  for (const item of publicationsSeed) {
    await Publication.findOneAndUpdate(
      { title: item.title, year: item.year },
      {
        ...item,
        citationCountSource: item.citationCount != null ? 'google-scholar' : null,
        citationCountUpdatedAt: item.citationCount != null ? new Date() : null,
      },
      { upsert: true, setDefaultsOnInsert: true }
    );
  }

  console.log(`[seed] Upserting ${academicProfilesSeed.length} academic/social profiles...`);
  for (const item of academicProfilesSeed) {
    await AcademicProfile.findOneAndUpdate({ network: item.network }, item, {
      upsert: true,
      setDefaultsOnInsert: true,
    });
  }

  console.log(`[seed] Upserting ${educationSeed.length} education record(s)...`);
  for (const item of educationSeed) {
    await Education.findOneAndUpdate(
      { degree: item.degree, institution: item.institution },
      item,
      { upsert: true, setDefaultsOnInsert: true }
    );
  }

  console.log(`[seed] Upserting ${presentationsSeed.length} presentation(s)...`);
  for (const item of presentationsSeed) {
    await Presentation.findOneAndUpdate(
      { title: item.title, event: item.event },
      item,
      { upsert: true, setDefaultsOnInsert: true }
    );
  }

  console.log(`[seed] Upserting ${achievementsSeed.length} achievement(s)...`);
  for (const item of achievementsSeed) {
    await Achievement.findOneAndUpdate(
      { title: item.title, type: item.type },
      item,
      { upsert: true, setDefaultsOnInsert: true }
    );
  }

  console.log('[seed] Done.');
}

seed()
  .then(() => disconnectDatabase())
  .then(() => process.exit(0))
  .catch(async (err) => {
    console.error('[seed] Failed:', err);
    await disconnectDatabase();
    process.exit(1);
  });
