'''
###############################################
###############################################
EXAMPLE OF HOW TO RUN THIS CODE
python nvlDataCleaning.py nvlDataSource.csv output.csv
so... that means...
python + script + dataFile + output file
###############################################
###############################################

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

    if tokens[8] == '4002':
      nvlDataClean[tokens[0]][tokens[4]][tokens[5]]['steps']+=1

#for i in nvlDataClean:
#	print ''
#	print str(i) + str(nvlDataClean[i])

#print len(nvlDataClean)

#Write results to file
  results = open(sys.argv[2], 'w')
  
  #results.write("subjectId,chapter,level,playTime,deaths,badgesEarned,anglesUnlocked,playCount")
  #results.write("\n")

  for subjectId in nvlDataClean:
    for chapter in nvlDataClean[subjectId]:
      for level in nvlDataClean[subjectId][chapter]:
        print str(subjectId)+','+str(chapter)+','+str(level)+','+str(nvlDataClean[subjectId][chapter][level]['playTime'])+','+str(nvlDataClean[subjectId][chapter][level]['deaths'])+','+str(nvlDataClean[subjectId][chapter][level]['badgesEarned'])+','+str(nvlDataClean[subjectId][chapter][level]['anglesUnlocked'])+','+str(nvlDataClean[subjectId][chapter][level]['playCount'])
        #results.write(str(subjectId)+','+str(chapter)+','+str(level)+','+'error'+','+str(nvlDataClean[subjectId][chapter][level]['deaths'])+','+str(nvlDataClean[subjectId][chapter][level]['badgesEarned'])+','+str(nvlDataClean[subjectId][chapter][level]['anglesUnlocked'])+','+str(nvlDataClean[subjectId][chapter][level]['playCount']))
        #results.write("\n")

  results.close()

  print "all done!"