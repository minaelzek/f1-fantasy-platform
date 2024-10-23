const League = require('../models/league');
const User = require('../models/user');

async function createLeague(name, ownerId) {
  const league = new League({ name, owner: ownerId });
  await league.save();
  return league;
}

async function getLeagues() {
  return await League.find().populate('owner').populate('members');
}

async function joinLeague(leagueId, userId) {
  const league = await League.findById(leagueId);
  if (!league) {
    throw new Error('League not found');
  }
  if (league.members.includes(userId)) {
    throw new Error('User already a member of the league');
  }
  league.members.push(userId);
  await league.save();
  return league;
}

async function leaveLeague(leagueId, userId) {
  const league = await League.findById(leagueId);
  if (!league) {
    throw new Error('League not found');
  }
  league.members = league.members.filter(member => member.toString() !== userId);
  await league.save();
  return league;
}

async function inviteUser(leagueId, email) {
  const league = await League.findById(leagueId);
  if (!league) {
    throw new Error('League not found');
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }
  if (league.members.includes(user._id)) {
    throw new Error('User already a member of the league');
  }
  // Send invitation logic here (e.g., email invitation)
  return { message: 'Invitation sent' };
}

module.exports = {
  createLeague,
  getLeagues,
  joinLeague,
  leaveLeague,
  inviteUser,
};
