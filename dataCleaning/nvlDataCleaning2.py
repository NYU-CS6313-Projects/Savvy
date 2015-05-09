'''
###############################################
###############################################
EXAMPLE OF HOW TO RUN THIS CODE
python nvlDataCleaning2.py output.csv output2csv
so... that means...
python + script + dataFile + output file

what this script does:
it takes output.csv from dataCleaning.py and aggregates
values found on the playCount level into level level.
e.g. if a given player went through chapter 1, level 5, 3 times, 
then the attributes for that level will be the sum of each for each
of the runs.So, if this player spent, 10, 20, and 30 seconds in each playthrough
the playTime attribute for chapter 1, level 5 will be 60 seconds.

###############################################
###############################################
DATA DICTIONARY (explaining columns from output.csv)

  tokens[0] = subjectId/ student
  tokens[1] = subject condition (level badges, no badges)
  tokens[2] = chapter played
  tokens[3] = level played
  tokens[4] = count of level played
  tokens[5] = playTime for that level
  tokens[6] = deaths for that level
  tokens[7] = badgesEarned for that level
  tokens[8] = anglesUnlocked for that level
  tokens[9] = steps taken to complete level
  tokens[10] = badgeDecision: OPT-IN, OPT-OUT
###############################################
###############################################
'''

import sys

if __name__ == '__main__':
  nvlData2 = open(sys.argv[1])
  next(nvlData2,None)

  #collect all data from csv into python dictionary
  nvlDataClean2 = {}

  for line in nvlData2:
    tokens = line.split(',')

    #print tokens[5]
    #print type(tokens[5])
    tokens[4] = int(float(tokens[4]))
    if tokens[5] != 'NULL':
      tokens[5] = int(float(tokens[5]))
    tokens[6] = int(float(tokens[6]))
    tokens[7] = int(float(tokens[7]))
    tokens[8] = int(float(tokens[8]))
    tokens[9] = int(float(tokens[9]))
    #print tokens[5]
    #print type(tokens[5])
    #print line

    #add subjectId to dictionary
    if tokens[0] not in nvlDataClean2:
      #print tokens[0]
      nvlDataClean2[tokens[0]]={}


    #add chapter to dictionary[subjectId]
    if tokens[2] != '':
      if tokens[2] not in nvlDataClean2[tokens[0]]:
        #print tokens[2]
        nvlDataClean2[tokens[0]][tokens[2]]={}


    #add level to dictionary[subjectId][chapter]
    if tokens[3] != '':
      if tokens[3] not in nvlDataClean2[tokens[0]][tokens[2]]:
        #print "\n this is new"
        #print tokens[0], tokens[2], tokens[3], tokens[4]
        nvlDataClean2[tokens[0]][tokens[2]][tokens[3]]={}
        nvlDataClean2[tokens[0]][tokens[2]][tokens[3]]['badgeCond']=tokens[1]
        nvlDataClean2[tokens[0]][tokens[2]][tokens[3]]['playCount']=tokens[4]
        
        if tokens[5] != 'NULL':
          nvlDataClean2[tokens[0]][tokens[2]][tokens[3]]['playTime']=tokens[5]
        else:
          nvlDataClean2[tokens[0]][tokens[2]][tokens[3]]['playTime']=0

        nvlDataClean2[tokens[0]][tokens[2]][tokens[3]]['deaths']=tokens[6]
        nvlDataClean2[tokens[0]][tokens[2]][tokens[3]]['badgesEarned']=tokens[7]
        nvlDataClean2[tokens[0]][tokens[2]][tokens[3]]['anglesUnlocked']=tokens[8]
        nvlDataClean2[tokens[0]][tokens[2]][tokens[3]]['steps']=tokens[9]
        nvlDataClean2[tokens[0]][tokens[2]][tokens[3]]['badgeDecision']=tokens[10]
      else:
        #print "\n this I already got!"
        #print tokens[0], tokens[2], tokens[3], tokens[4]
       
        if tokens[4]>nvlDataClean2[tokens[0]][tokens[2]][tokens[3]]['playCount']:
          nvlDataClean2[tokens[0]][tokens[2]][tokens[3]]['playCount']=tokens[4]
        
        if tokens[5] != 'NULL':
          nvlDataClean2[tokens[0]][tokens[2]][tokens[3]]['playTime']+=tokens[5]
        
        nvlDataClean2[tokens[0]][tokens[2]][tokens[3]]['deaths']+=tokens[6]
        nvlDataClean2[tokens[0]][tokens[2]][tokens[3]]['badgesEarned']+=tokens[7]
        nvlDataClean2[tokens[0]][tokens[2]][tokens[3]]['anglesUnlocked']+=tokens[8]
        nvlDataClean2[tokens[0]][tokens[2]][tokens[3]]['steps']+=tokens[9]
        
        #this might be shady, think it out
        #nvlDataClean2[tokens[0]][tokens[2]][tokens[3]]['badgeDecision']=tokens[10]

#Write results to file
  results = open(sys.argv[2], 'w')
  
  results.write("subjectId,subjectCond,chapter,level,playCount,playTime,deaths,badgesEarned,anglesUnlocked,steps,badgeDecision")
  results.write("\n")

  #count for debugging
  count = 0
  
  for subjectId in nvlDataClean2:
    for chapter in nvlDataClean2[subjectId]:
      for level in nvlDataClean2[subjectId][chapter]:
          
          #prints for debugging
          #print subjectId, chapter, level, playCount
          #print nvlDataClean[subjectId][chapter][level][playCount]['badgeCond']
          #print nvlDataClean[subjectId][chapter][level][playCount]['playTime']
          #print nvlDataClean[subjectId][chapter][level][playCount]['deaths']
          #print nvlDataClean[subjectId][chapter][level][playCount]['badgesEarned']
          #print nvlDataClean[subjectId][chapter][level][playCount]['anglesUnlocked']
          #print nvlDataClean[subjectId][chapter][level][playCount]['steps']
          #print nvlDataClean[subjectId][chapter][level][playCount]['badgeDecision']
          
          results.write(str(subjectId)+','+str(nvlDataClean2[subjectId][chapter][level]['badgeCond'])+','+str(chapter)+','+str(level)+','+str(nvlDataClean2[subjectId][chapter][level]['playCount']-1)+','+str(nvlDataClean2[subjectId][chapter][level]['playTime'])+','+str(nvlDataClean2[subjectId][chapter][level]['deaths'])+','+str(nvlDataClean2[subjectId][chapter][level]['badgesEarned'])+','+str(nvlDataClean2[subjectId][chapter][level]['anglesUnlocked'])+','+str(nvlDataClean2[subjectId][chapter][level]['steps'])+','+str(nvlDataClean2[subjectId][chapter][level]['badgeDecision']))
          #results.write("\n")
        
  results.close()

  #print count
  
print "all done!"