'''
###############################################
###############################################
EXAMPLE OF HOW TO RUN THIS CODE
python nvlDataCleaning3.py output2.csv output3csv
so... that means...
python + script + dataFile + output file

what this script does:
it takes output2.csv from dataCleaning2.py and aggregates
all values found for a player into a single metric
e.g. if a given player played three level in chapter one,
dying 5, 10 and 2 times; a single value for that player will be
recorded with a value of 17.

###############################################
###############################################
DATA DICTIONARY (explaining columns from output2.csv)

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
  nvlData3 = open(sys.argv[1])
  next(nvlData3,None)

  #collect all data from csv into python dictionary
  nvlDataClean3 = {}

  for line in nvlData3:
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
    if tokens[0] not in nvlDataClean3:
      #print tokens[0]
      nvlDataClean3[tokens[0]]={}
      nvlDataClean3[tokens[0]]['deaths']=tokens[6]

    else:
      nvlDataClean3[tokens[0]]['deaths']+=tokens[6]

#print nvlDataClean3

    

#Write results to file
  results = open(sys.argv[2], 'w')
  
  results.write("subjectId,playCount,playTime,deaths,badgesEarned,anglesUnlocked,steps")
  results.write("\n")

  #count for debugging
  count = 0
  
  for subjectId in nvlDataClean3:      
          results.write(str(subjectId)+','+str(nvlDataClean3[subjectId]['deaths']))
          results.write("\n")
        
  results.close()

  #print count

print "all done!"

'''
results.write(str(subjectId)+','+str(nvlDataClean2[subjectId]['playCount']-1)+','+str(nvlDataClean2[subjectId]['playTime'])+','+str(nvlDataClean2[subjectId]['deaths'])+','+str(nvlDataClean2[level]['badgesEarned'])+','+str(nvlDataClean2[subjectId]['anglesUnlocked'])+','+str(nvlDataClean2[subjectId]['steps']))
'''