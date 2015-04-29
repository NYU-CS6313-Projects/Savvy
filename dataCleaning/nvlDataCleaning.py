'''
###############################################
###############################################
EXAMPLE OF HOW TO RUN THIS CODE
python nvlDataCleaning.py nvlDataSource.csv output.csv
so... that means...
python + script + dataFile + output file
###############################################
###############################################
DATA DICTIONARY (explaining columns from Melissa's CSV)

tokens[0] = subjectID
tokens[1] = subjectCond
tokens[2] = testDate
tokens[3] = writer
tokens[4] = chapter
tokens[5] = level
tokens[6] = playCnt
tokens[7] = gameTime
tokens[8] = gameCode
tokens[9] = shortDesc
tokens[10] = d01
tokens[11] = d02
tokens[12] = d03
tokens[13] = d04
tokens[14] = dataDescription
###############################################
###############################################
'''

import sys

if __name__ == '__main__':
  nvlData = open(sys.argv[1])
  next(nvlData,None)

  #collect all data from csv into python dictionary
  nvlDataClean = {}

  for line in nvlData:
    tokens = line.split(',')
    
    #add subjectId to dictionary
    if tokens[0] not in nvlDataClean:
    	#print tokens[0]
    	nvlDataClean[tokens[0]]={}
    
    #add chapter to dictionary[subjectId]
    if tokens[4] != '':
      if tokens[4] not in nvlDataClean[tokens[0]]:
        #print tokens[4]
        nvlDataClean[tokens[0]][tokens[4]]={}
    
    #add level to dictionary[subjectId][chapter]
    if tokens[5] != '':
      if tokens[5] not in nvlDataClean[tokens[0]][tokens[4]]:
        #print tokens[5]
        nvlDataClean[tokens[0]][tokens[4]][tokens[5]]={}
        #set deaths per level at 0
        nvlDataClean[tokens[0]][tokens[4]][tokens[5]]['deaths']=0
        #set badgesEarned per level at 0
        nvlDataClean[tokens[0]][tokens[4]][tokens[5]]['badgesEarned']=0
        #set anglesUnlocked per level at 0
        nvlDataClean[tokens[0]][tokens[4]][tokens[5]]['anglesUnlocked']=0
        #set playCount per level at 1
        nvlDataClean[tokens[0]][tokens[4]][tokens[5]]['playCount']=1
        #set steps per level at 0
        nvlDataClean[tokens[0]][tokens[4]][tokens[5]]['steps']=0

    #insert playTime for each level for each chapter into dictionary
    if tokens[8] == '5002':
    	#print type(tokens[11])
    	#changing variable type
    	tokens[11] = int(float(tokens[11]))
    	#print type(tokens[11])
    	#print tokens[0] + ' chapter:' + tokens[4] + ' level:' + tokens[5] + ' playTime:' + tokens[11]
    	nvlDataClean[tokens[0]][tokens[4]][tokens[5]]['playTime']=round(tokens[11])

    #count deaths for each level for each chapter for each subjectId and store in dictionary
    if tokens[8] == '3003':
    	#print tokens[11]
    	if tokens[11] == 'DIED':
    	  nvlDataClean[tokens[0]][tokens[4]][tokens[5]]['deaths']+=1

    #count badgesEarned for each level for each chapter for each subjectId and store in dictionary
    if tokens[8] == '3101':
      nvlDataClean[tokens[0]][tokens[4]][tokens[5]]['badgesEarned']+=1

    #count anglesUnlocked for each level for each chapter for each subjectId and store in dictionary
    if tokens[8] == '3008':
      nvlDataClean[tokens[0]][tokens[4]][tokens[5]]['anglesUnlocked']+=1

    #count playCount for each level for each chapter for each subjectId and store in dictionary
    if tokens[8] == '3002':
      #changing variable type
      tokens[6] = int(float(tokens[6]))
      if tokens[6] > nvlDataClean[tokens[0]][tokens[4]][tokens[5]]['playCount']:
        nvlDataClean[tokens[0]][tokens[4]][tokens[5]]['playCount']=tokens[6]

    #count number of times the player moved the noob, add +1 for each time to get a total 'steps taken to complete level' measure.
    if tokens[8] == '4002':
      nvlDataClean[tokens[0]][tokens[4]][tokens[5]]['steps']+=1

    #store badge decision status. OPT-IN, OPT-OUT
    if tokens[8] == '4008':
      #print tokens[10]
      nvlDataClean[tokens[0]][tokens[4]][tokens[5]]['badgeDecision']=tokens[10]




#for i in nvlDataClean:
#	print ''
#	print str(i) + str(nvlDataClean[i])

#print len(nvlDataClean)

#in this section i'll fill in all the null attributes that weren't obtained from the dataset in order to have a consistent amount of information for each row.
  for subjectId in nvlDataClean:
    for chapter in nvlDataClean[subjectId]:
      for level in nvlDataClean[subjectId][chapter]:
        if 'playTime' not in nvlDataClean[subjectId][chapter][level]:
          nvlDataClean[subjectId][chapter][level]['playTime']='NULL'
        if 'badgeDecision' not in nvlDataClean[subjectId][chapter][level]:
          nvlDataClean[subjectId][chapter][level]['badgeDecision']='NULL'


# for subjectId in nvlDataClean:
#     for chapter in nvlDataClean[subjectId]:
#       for level in nvlDataClean[subjectId][chapter]:
#         print str(nvlDataClean[subjectId][chapter][level]['playTime'])



#Write results to file
  results = open(sys.argv[2], 'w')
  
  results.write("subjectId,chapter,level,playTime,deaths,badgesEarned,anglesUnlocked,playCount,steps,badgeDecision")
  results.write("\n")

  '''
  ###############################################
  ###############################################
  DATA DICTIONARY (explaining columns from our CSV)

  tokens[0] = subjectID/ student
  tokens[1] = chapter played
  tokens[2] = level played
  tokens[3] = playTime for that level
  tokens[4] = deaths for that level
  tokens[5] = badgesEarned for that level
  tokens[6] = anglesUnlocked for that level
  tokens[7] = playCount. times that level was played
  tokens[8] = steps taken to complete level
  tokens[9] = badgeDecision: OPT-IN, OPT-OUT
  ###############################################
  ###############################################
  '''

  #count for debugging
  count = 0
  
  for subjectId in nvlDataClean:
    for chapter in nvlDataClean[subjectId]:
      for level in nvlDataClean[subjectId][chapter]:
        #try:
        results.write(str(subjectId)+','+str(chapter)+','+str(level)+','+str(nvlDataClean[subjectId][chapter][level]['playTime'])+','+str(nvlDataClean[subjectId][chapter][level]['deaths'])+','+str(nvlDataClean[subjectId][chapter][level]['badgesEarned'])+','+str(nvlDataClean[subjectId][chapter][level]['anglesUnlocked'])+','+str(nvlDataClean[subjectId][chapter][level]['playCount'])+','+str(nvlDataClean[subjectId][chapter][level]['steps'])+','+str(nvlDataClean[subjectId][chapter][level]['badgeDecision']))
        results.write("\n")
        
        '''
        #except KeyError:
          #there are cases where there is no associated playTime for a level since it was the last one played by the subjectId
          #in this case 'null' is inserted in position [3]
          count += 1
          results.write(str(subjectId)+','+str(chapter)+','+str(level)+',NULL,'+str(nvlDataClean[subjectId][chapter][level]['deaths'])+','+str(nvlDataClean[subjectId][chapter][level]['badgesEarned'])+','+str(nvlDataClean[subjectId][chapter][level]['anglesUnlocked'])+','+str(nvlDataClean[subjectId][chapter][level]['playCount'])+','+str(nvlDataClean[subjectId][chapter][level]['playCount']))
          results.write("\n")
          #pass
        '''

  results.close()

  #print count
  
print "all done!"